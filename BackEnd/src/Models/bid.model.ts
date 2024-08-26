import mongoose, { Document, Schema } from "mongoose";

export enum BidStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export interface IBid {
  jobId: mongoose.Types.ObjectId;
  freelancerId: mongoose.Types.ObjectId;
  freelancerName: string;
  bidAmount: number;
  deliveryTime: number;
  description: string;
  clientId: mongoose.Types.ObjectId;
  status: BidStatus;
  deleted: boolean;
}

export interface IBidModel extends IBid, Document {
  _id: mongoose.Schema.Types.ObjectId;
}

export const bidSchema: Schema<IBidModel> = new Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancerName: {
      type: String,
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: BidStatus,
      required: true,
      default: BidStatus.Pending,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Bid = mongoose.model<IBidModel>("Bid", bidSchema);
export default Bid;
