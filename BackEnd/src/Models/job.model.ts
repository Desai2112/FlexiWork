import mongoose, { Document, Schema } from "mongoose";

export enum JobStatus {
  Completed = "completed",
  Assigned = "assigned",
  New = "new",
  Expired = "expired",
}

export interface IJob {
  projectName: string;
  description: string;
  status: JobStatus;
  updatedAt: Date;
  createdAt: Date;
  expectedTime: number;
  maxPrice: number;
  bidDuration: number;
  bidEnds: Date;
  ClientId: mongoose.Schema.Types.ObjectId;
  requiredSkills: mongoose.Types.ObjectId[];
  deleted: boolean;
  _id: Schema.Types.ObjectId;
}

export interface IJobModel extends IJob, Document {
  _id: mongoose.Schema.Types.ObjectId;
}

export const jobSchema: Schema<IJobModel> = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: JobStatus,
      required: true,
      default: JobStatus.New,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    expectedTime: {
      type: Number,
      required: true,
    },
    bidDuration: {
      type: Number,
      required: true,
    },
    bidEnds: {
      type: Date,
      required: true,
    },
    requiredSkills: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Skill",
      required: true,
    },
    ClientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Job = mongoose.model<IJobModel>("Job", jobSchema);
export default Job;
