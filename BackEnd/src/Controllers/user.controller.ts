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

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

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
    if (user && user.emailVerified) {
      return res.status(409).json({
        success: false,
        message: "User already verified",
      });
    } else if (user) {
      return res.status(400).json({
        message: "Email already sent.",
        success: false,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await User.create({
      email: email,
      otp: otp,
      otpExpires: otpExpires,
    });

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

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
        success: false,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    } else {
      const verified = user.verifyOTP(otp);

      if (verified) {
        user.emailVerified = true;
        await user.save();
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

// FIXME: update the addUser fuction according to the otp config ;
const addUser = async (
  req: Request<
    any,
    SignUpResponseBodyType | GenericResponseType,
    SignUpBodyType
  >,
  res: Response<SignUpResponseBodyType | GenericResponseType>,
  next: NextFunction,
) => {
  try {
    console.log(req.body);
    const { name, email, password, role, bio } = req.body;

    if (!name || !email || !password || !role || !bio) {
      return res.status(400).json({
        message: "All the fields are required.",
        success: false,
      });
    }

    if (!validator.isLength(password, { min: 10 })) {
      return res.status(400).json({
        message: "Password must be at least 10 characters long.",
        success: false,
      });
    }

    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({
        message: "Email already exists.",
        success: false,
      });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password,
      role: role,
      bio: bio,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      userDetails: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        bio: newUser.bio || "",
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
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
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    req.session.user = user._id;

    res.status(200).json({
      message: "Login successful.",
      userDetails: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio || "",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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

export { addUser, loginUser, getDetails, logOut, sendOtp, verifyOtp };
