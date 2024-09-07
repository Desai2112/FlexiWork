import { User, userRole } from "../Models/user.model";
import { Request, Response, NextFunction } from "express";
import validator from "validator";
import {
  addCompanydetailsReqBody,
  AddFreelancerdetailsReqBody,
  loginBodyType,
  loginResponseBodyType,
  MeResponseBodyType,
  ResetPasswordEmailReqBodyType,
  ResetPasswordReqBodyType,
  SendOTPReqBodyType,
  VerifyOTPReqBodyType,
  VerifyPasstokenReqBody,
} from "../Schemas/auth.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";
import { sendOTPEmail } from "../Configurations/sendOtpMail";
import { Verification } from "../Models/verification.model";
import bcrypt from "bcrypt";
import { sendPasswordResetEmail } from "../Configurations/sendResetPass";
import { Freelancer } from "../Models/freelancer.model";
import { Company } from "../Models/company.model";

const sendOtp = async (
  req: Request<any, GenericResponseType, SendOTPReqBodyType>,
  res: Response<GenericResponseType>,
) => {
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

const verifyOtp = async (
  req: Request<any, GenericResponseType, VerifyOTPReqBodyType>,
  res: Response<GenericResponseType>,
) => {
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
        await user.updateOne({
          emailVerified: true,
        });
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

const addCompanyDetails = async (
  req: Request<any, GenericResponseType, addCompanydetailsReqBody>,
  res: Response<GenericResponseType>,
) => {
  const {
    name,
    email,
    password,
    role,
    logoUrl,
    description,
    address,
    contactNumber,
    companyWebsite,
  } = req.body;
  // console.log(req.body);
  // Check for missing fields
  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !logoUrl ||
    !description ||
    !address ||
    !contactNumber
  ) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  // Verify if the email is already verified
  const verifiedEmail = await Verification.findOne({ email });
  if (!verifiedEmail || !verifiedEmail.emailVerified) {
    return res.status(400).json({
      message: "Email is not verified",
      success: false,
    });
  }

  // Validate the contact number
  if (!validator.isMobilePhone(contactNumber, "any")) {
    return res.status(400).json({
      message: "Contact number is not valid",
      success: false,
    });
  }

  // Check if the role is correct
  if (role !== userRole.client) {
    return res.status(400).json({
      message:
        "Invalid role. Only companies can be added through this endpoint.",
      success: false,
    });
  }

  // Check if a user with the same email already exists
  const existingCompany = await User.findOne({ email });
  if (existingCompany) {
    return res.status(400).json({
      message: "A company with this email already exists",
      success: false,
    });
  }

  // Hash the password before saving
  // const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await User.create({
    name,
    email,
    password,
    role,
    profileCompleted: false,
  });

  if (!user) {
    return res.status(500).json({
      message: "Failed to create user",
      success: false,
    });
  }

  // Create the company details
  const company = await Company.create({
    userId: user._id,
    name,
    email,
    description,
    address,
    contactNumber,
    logoUrl,
    website: companyWebsite || "",
  });

  if (!company) {
    // Rollback: Delete user if company creation fails
    await User.findByIdAndDelete(user._id);
    return res.status(500).json({
      message: "Failed to create company details",
      success: false,
    });
  }

  // Update the user with the company details
  await user.updateOne({
    profileCompleted: true,
    userDetails: company._id,
  });

  // Set the session with the newly created user's ID
  req.session.user = user._id;
  console.log(req.session.user);
  return res.status(201).json({
    message: "Company added successfully",
    success: true,
  });
};

const addFreelancerDetails = async (
  req: Request<any, GenericResponseType, AddFreelancerdetailsReqBody>,
  res: Response<GenericResponseType>,
) => {
  try {
    const {
      name,
      email,
      password,
      role,
      profilePicUrl,
      bio,
      skills,
      mobileNo,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !profilePicUrl ||
      !bio ||
      !skills.length ||
      !mobileNo
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const verifiedEmail = await Verification.findOne({ email: email });
    if (verifiedEmail && !verifiedEmail.emailVerified) {
      return res.status(400).json({
        message: "Email is not verified",
        success: false,
      });
    }

    if (!validator.isMobilePhone(mobileNo)) {
      return res.status(400).json({
        message: "Mobile number is not valid",
        success: false,
      });
    }

    // Ensure the role is freelancer
    if (role !== userRole.freelancer) {
      return res.status(400).json({
        message:
          "Invalid role. Only freelancers can be added through this endpoint.",
        success: false,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileCompleted: false, // Set initially to false
    });

    // Ensure user creation was successful
    if (!user) {
      return res.status(500).json({
        message: "Failed to create user",
        success: false,
      });
    }

    // Create freelancer details
    const freelancer = await Freelancer.create({
      userId: user._id,
      bio,
      skills,
      mobileNo,
      profilePicUrl,
    });

    if (!freelancer) {
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({
        message: "Failed to create freelancer details",
        success: false,
      });
    }

    // Update user with freelancer details
    await user.updateOne({
      profileCompleted: true,
      userDetails: freelancer._id,
    });
    req.session.user = user._id;
    return res.status(201).json({
      message: "Freelancer added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }
    const user = await User.findOne({ email: email.toLocaleLowerCase() });
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
    // console.log(req.session.user);
    const user = await User.findById(req.session.user).populate("userDetails");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User found",
      user: user,
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

const resetPasswordEmail = async (
  req: Request<any, GenericResponseType, ResetPasswordEmailReqBodyType>,
  res: Response<GenericResponseType>,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    await user.createPasswordResetToken();

    await user.save();

    const resetLink = `${
      process.env.FRONTEND_URL
    }/reset-password/${encodeURIComponent(user.passwordResetToken || "")}`;

    await sendPasswordResetEmail(email, resetLink);

    return res.status(200).json({
      message: "Password reset email sent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error occurred while sending reset email:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const resetPassword = async (
  req: Request<any, GenericResponseType, ResetPasswordReqBodyType>,
  res: Response<GenericResponseType>,
) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
        success: false,
      });
    }
    const decodedToken = decodeURIComponent(token);

    const user = await User.findOne({ passwordResetToken: decodedToken });

    if (!user) {
      return res.status(404).json({
        message: "Invalid or expired token",
        success: false,
      });
    }

    if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
      return res.status(400).json({
        message: "Reset token has expired",
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
    console.error("Error occurred during password reset:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const verifyPasstoken = async (
  req: Request<any, GenericResponseType, VerifyPasstokenReqBody>,
  res: Response<GenericResponseType>,
) => {
  const { token } = req.body;
  const decodedToken = decodeURIComponent(token);
  const user = await User.findOne({ passwordResetToken: decodedToken });
  if (!user) {
    return res.status(404).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
  if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
    return res.status(400).json({
      message: "Reset token has expired",
      success: false,
    });
  }
  return res.status(200).json({
    message: "Token verified successfully",
    success: true,
  });
};

export {
  addCompanyDetails,
  addFreelancerDetails,
  loginUser,
  getDetails,
  logOut,
  sendOtp,
  verifyOtp,
  resetPasswordEmail,
  resetPassword,
  verifyPasstoken,
};
