import mongoose, { Schema } from "mongoose";
import { IUser, userRole } from "../Models/user.model";
import { StrongPasswordOptions } from "validator";

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

export type AddFreelancerdetailsReqBody = {
  name: string;
  email: string;
  password: string;
  role: userRole.freelancer;
  profilePicUrl: string;
  bio: string;
  skills: mongoose.Schema.Types.ObjectId[];
  mobileNo: string;
};

export type addCompanydetailsReqBody = {
  name: string;
  email: string;
  password: string;
  role: userRole.client;
  logoUrl: string;
  description: string;
  address: string;
  contactNumber: string;
  companyWebsite?: string;
};
