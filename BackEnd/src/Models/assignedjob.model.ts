import mongoose, { Document, Schema } from "mongoose";

export enum JobStatus {
  Ongoing = "ongoing",
  Completed = "completed",
}
export interface IAssignedJob {
  jobId: mongoose.Types.ObjectId;
  freelancerId: mongoose.Types.ObjectId;
  status: JobStatus;
  AcceptedBid: number;
  clientId: mongoose.Types.ObjectId;
  deleted: boolean;
}

export interface IAssignedJobModel extends IAssignedJob, Document {
  _id: mongoose.Schema.Types.ObjectId;
}

export const assignedJobSchema: Schema<IAssignedJobModel> = new Schema(
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
    status: {
      type: String,
      enum: JobStatus,
      required: true,
      default: JobStatus.Ongoing,
    },
    AcceptedBid: {
      type: Number,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export const AssignedJob = mongoose.model<IAssignedJobModel>(
  "AssignedJob",
  assignedJobSchema,
);
export default AssignedJob;
