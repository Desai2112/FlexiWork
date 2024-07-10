import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define User Roles
export enum userRole {
  client = "client",
  freelancer = "freelancer",
}

// Define User Interface
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: userRole;
  bio?: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

// Define User Model Interface
export interface IUserModel extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
  createPasswordResetToken(): Promise<string>;
}

// Define User Schema
const userSchema: Schema<IUserModel> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
    bio: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Pre-save middleware to hash password
userSchema.pre<IUserModel>("save", async function (next) {
  const user = this as IUserModel;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const user = this as IUserModel;
  return bcrypt.compare(password, user.password);
};

// Method to create password reset token
userSchema.methods.createPasswordResetToken =
  async function (): Promise<string> {
    const user = this as IUserModel;
    const resetToken = bcrypt.genSaltSync(10);
    const hashedToken = bcrypt.hashSync(resetToken, 10);
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    return resetToken;
  };

// Define and export User model
export const User = mongoose.model<IUserModel>("User", userSchema);
export default User;
