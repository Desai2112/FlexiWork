import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define User Roles
export enum userRole {
  client = "client",
  freelancer = "freelancer",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: userRole;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerified: boolean;
  profileCompleted: boolean;
  userDetails: mongoose.Types.ObjectId;
}

export interface IUserModel extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
  createPasswordResetToken(): Promise<string>;
  getUserDetailsModel(): string; // Method to get the reference model
  _id: mongoose.Schema.Types.ObjectId;
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
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userDetailsModel", // Dynamically sets the reference model
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

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  const user = this as IUserModel;
  return bcrypt.compare(password, user.password);
};

// Method to create a password reset token
userSchema.methods.createPasswordResetToken =
  async function (): Promise<string> {
    const user = this as IUserModel;
    const resetToken = bcrypt.genSaltSync(10);
    const hashedToken = bcrypt.hashSync(resetToken, 10);
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
  };

// Method to get the correct reference model based on role
userSchema.virtual("userDetailsModel").get(function () {
  return this.role === userRole.client ? "Company" : "Freelancer";
});

export const User = mongoose.model<IUserModel>("User", userSchema);
export default User;
