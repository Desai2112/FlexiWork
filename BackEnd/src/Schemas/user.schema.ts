import mongoose, { Schema } from "mongoose";
import { IUser, userRole } from "../Models/user";

export type loginBodyType = { email: string; password: string };

export type SignUpBodyType = {
  name: string;
  email: string;
  password: string;
  role: userRole;
  bio: string;
};

export type loginResponseBodyType = {
  message: string;
  userDetails: {
    role: userRole;
    profileCompleted: boolean;
  };
  success: Boolean;
};

export type SignUpResponseBodyType = {
  message: string;
  userDetails: {
    id: Schema.Types.ObjectId;
    name: string;
    email: string;
    role: userRole;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
  };
  success: Boolean;
};

export type MeResponseBodyType = {
  message: string;
  user: IUser;
  success: Boolean;
};
