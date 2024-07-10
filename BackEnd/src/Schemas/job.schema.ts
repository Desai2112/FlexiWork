import { Schema } from "mongoose";
import { IJob, jobStatus } from "../Models/job";

export type AssignJobRequestBodyType = {
  freelancerId: Schema.Types.ObjectId;
  projectId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  comment: string;
  bidAmount: number;
};

export type AssignJobResponseBodyType = {
  message: string;
  job: IJob;
  success: boolean;
};

export type JobStatusUpdateRequestBodyType = {
  jobId: Schema.Types.ObjectId;
  status: jobStatus;
};

export type JobStatusUpdateResponseBodyType = {
  message: string;
  job: IJob;
  success: boolean;
};

export type showPendingJobStatusResponseBodyType = {
  message: string;
  pendingjobs: IJob[];
  success: boolean;
};
