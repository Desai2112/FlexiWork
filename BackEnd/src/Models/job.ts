import mongoose, { Number, Schema } from "mongoose";

export enum jobStatus {
  New = "New",
  Pending = "Pending",
  Active = "Active",
  Rejected = "Rejected",
  Complete = "Complete",
}
export type IJob = {
  projectId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  freelancerId: Schema.Types.ObjectId;
  comment: string;
  status: jobStatus;
  bidAmount: number;
};
export const jobSchema: Schema<IJob> = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: jobStatus,
      required: true,
      default: jobStatus.New,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Job = mongoose.model<IJob>("Job", jobSchema);
