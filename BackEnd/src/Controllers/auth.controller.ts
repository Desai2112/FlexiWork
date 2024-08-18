import { User } from "../Models/user";
import { Request, Response, NextFunction } from "express";
import validator from "validator";
import {
  loginBodyType,
  loginResponseBodyType,
  MeResponseBodyType,
  SignUpBodyType,
  SignUpResponseBodyType,
} from "../Schemas/user.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";
import { sendOTPEmail } from "../Configurations/sendOtpMail";
import { Verification } from "../Models/verification";
import Skill from "../Models/skills";
import bcrypt from "bcrypt";
import { sendPasswordResetEmail } from "../Configurations/sendResetPass";

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Email is not valid.",
        success: false,
      });
    }

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const existingVerification = await Verification.findOne({ email: email });
    if (existingVerification) {
      await existingVerification.updateOne({
        otp: otp,
        otpExpires: otpExpires,
      });
    } else {
      await Verification.create({
        email: email.toLowerCase(),
        role: role,
        otp: otp,
        otpExpires: otpExpires,
      });
    }
    await sendOTPEmail(email, otp);
    return res.status(200).json({
      message: "OTP send successfully to your email.",
      success: true,
    });
  } catch (error) {
    console.log("Error Accured: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body);

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
        success: false,
      });
    }
    const user = await Verification.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    } else {
      const verified = user.verifyOTP(otp);

      if (verified) {
        user.emailVerified = true;
        await User.create({
          email: user.email,
          role: user.role,
          emailVerified: true,
        });
        await Verification.deleteOne({ email: email });
        return res.status(200).json({
          message: "OTP is verified.",
          success: true,
        });
      } else {
        return res.status(400).json({
          message: "Invalid OTP.",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, role, password, mobileNo, companyName, skills, bio } =
      req.body;

    // Validate required fields
    if (!name || !password || !bio || !email || !mobileNo || !role) {
      return res.status(400).json({
        message: "All the fields are required.",
        success: false,
      });
    }

    // Validate role-specific fields
    if (role === "freelancer" && !skills) {
      return res.status(400).json({
        message: "Skills are required for freelancer.",
        success: false,
      });
    } else if (role === "client" && !companyName) {
      return res.status(400).json({
        message: "Company name is required for client.",
        success: false,
      });
    }

    // Validate password length
    if (!validator.isLength(password, { min: 10 })) {
      return res.status(400).json({
        message: "Password must be at least 10 characters long.",
        success: false,
      });
    }
    let hpassword = await bcrypt.hash(password, 10);
    // Prepare data for update or creation
    const updateData: any = {
      name,
      password: hpassword,
      mobileNo,
      bio,
      profileCompleted: true,
      ...(role === "client" ? { companyName } : { skills }),
    };

    // Find and update or create user
    const user = await User.findOneAndUpdate({ email }, updateData, {
      new: true,
      upsert: true,
    });

    req.session.user = user._id;
    return res.status(200).json({
      message: "User created or updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const loginUser = async (
  req: Request<any, loginResponseBodyType | GenericResponseType, loginBodyType>,
  res: Response<loginResponseBodyType | GenericResponseType>,
  next: NextFunction,
) => {
  try {
    // const body = req.body;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
    }

    req.session.user = user._id;

    res.status(200).json({
      message: "Login successful.",
      userDetails: {
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getDetails = async (
  req: Request<any, MeResponseBodyType | GenericResponseType>,
  res: Response<MeResponseBodyType | GenericResponseType>,
) => {
  try {
    const user = await User.findById(req.session.user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User found",
      user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const logOut = async (
  req: Request<any, GenericResponseType>,
  res: Response<GenericResponseType>,
) => {
  try {
    await req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to log out", success: false });
      } else {
        res
          .status(200)
          .json({ message: "Logged out successfully", success: true });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getAllSiklls = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find();
    if (!skills) {
      return res.status(404).json({
        message: "No skills found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Skills found",
      skills,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
};

const resetPasswordEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const passwordResetToken = await user.createPasswordResetToken();
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${passwordResetToken}`;

    await sendPasswordResetEmail(email, resetLink);
    return res.status(200).json({
      message: "Password reset email sent successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error Accured: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
        success: false,
      });
    }
    try {
      const user = await User.findOne({ passwordResetToken: token });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return res.status(200).json({
        message: "Password reset successfully",
        success: true,
      });
    } catch (error) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error Accured: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export {
  addUser,
  loginUser,
  getDetails,
  logOut,
  sendOtp,
  verifyOtp,
  getAllSiklls,
  resetPasswordEmail,
  resetPassword,
};
