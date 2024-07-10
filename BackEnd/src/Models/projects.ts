import mongoose, { Document, Schema } from "mongoose";

export enum ProjectStatus {
  Completed = "completed",
  Running = "running",
  Pending = "pending",
}

export type IProject = {
  projectName: string;
  description: string;
  status: ProjectStatus;
  updatedAt: Date;
  createdAt: Date;
  completed: boolean;
  minPrice: number;
  maxPrice: number;
  ClientId: mongoose.Types.ObjectId;
  deleted: boolean;
  _id: Schema.Types.ObjectId;
};

export const projectSchema: Schema<IProject> = new Schema(
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
      enum: ProjectStatus,
      required: true,
      default: ProjectStatus.Pending,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
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

export const Project = mongoose.model<IProject>("Project", projectSchema);
