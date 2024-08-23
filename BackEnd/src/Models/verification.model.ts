import mongoose, { Document, Schema } from "mongoose";
import { userRole } from "./user.model";

export interface Iverification {
  email: string;
  otp: string;
  role: userRole;
  otpExpires: Date;
  emailVerified: boolean;
}

export interface IVerificationModel extends Iverification, Document {
  verifyOTP(otp: string): boolean | undefined;
  _id: mongoose.Schema.Types.ObjectId;
}

const verificationSchema: Schema<IVerificationModel> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  role: {
    type: String,
    enum: userRole,
  },
  otpExpires: {
    type: Date,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
});

// Method to verify OTP
verificationSchema.methods.verifyOTP = function (
  otp: string,
): boolean | undefined {
  const user = this as IVerificationModel;
  const isValid =
    user.otp === otp && user.otpExpires && user.otpExpires > new Date();
  console.log(user.otp);
  console.log(otp);
  console.log(isValid);
  return isValid;
};

export const Verification = mongoose.model<IVerificationModel>(
  "Verification",
  verificationSchema,
);

export default Verification;
