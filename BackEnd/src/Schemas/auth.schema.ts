import mongoose, { Schema } from "mongoose";
import { IUser, userRole } from "../Models/user.model";

export type loginBodyType = { email: string; password: string };

export type loginResponseBodyType = {
  message: string;
  userDetails: {
    role: userRole;
    profileCompleted: boolean;
  };
  success: Boolean;
};

export type MeResponseBodyType = {
  message: string;
  user: IUser;
  success: Boolean;
};

export type SendOTPReqBodyType = {
  email: string;
  role: string;
};

export type VerifyOTPReqBodyType = {
  email: string;
  otp: string;
};

export type ResetPasswordEmailReqBodyType = {
  email: string;
};

export type ResetPasswordReqBodyType = {
  token: string;
  password: string;
};

export type VerifyPasstokenReqBody = {
  token: string;
};

export type AddUserReqBody = {
  name: string;
  email: string;
  role: userRole;
  password: string;
  mobileNo: string;
  companyName?: string;
  skills: mongoose.Schema.Types.ObjectId[];
  bio: string;
  profilePicUrl: string;
};
