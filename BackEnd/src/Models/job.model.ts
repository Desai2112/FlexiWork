import mongoose, { Document, Schema } from "mongoose";

export enum JobStatus {
  Completed = "completed",
  Assigned = "assigned",
  New = "new",
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
  ClientId: mongoose.Types.ObjectId;
  requiredSkills: mongoose.Types.ObjectId[];
  deleted: boolean;
  _id: Schema.Types.ObjectId;
}

export interface IJobModel extends IJob, Document {
  _id: mongoose.Schema.Types.ObjectId;
}

export const jobSchema: Schema<IJob> = new Schema(
  {
    projectName: {
      type: String,
      required: true,
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

export const Job = mongoose.model<IJob>("Job", jobSchema);
export default Job;
