import { Request, Response } from "express";
import {
  AssignJobRequestBodyType,
  AssignJobResponseBodyType,
  JobStatusUpdateRequestBodyType,
  JobStatusUpdateResponseBodyType,
  showPendingJobStatusResponseBodyType,
} from "../Schemas/job.schema";
import { Job, jobStatus } from "../Models/job";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const assignJob = async (
  req: Request<
    any,
    AssignJobResponseBodyType | GenericResponseType,
    AssignJobRequestBodyType
  >,
  res: Response<AssignJobResponseBodyType | GenericResponseType>,
) => {
  try {
    const { projectId, clientId, freelancerId, bidAmount, comment } = req.body;
    if (!projectId || !clientId || !freelancerId || bidAmount) {
      return res.status(400).json({
        success: false,
        message: "ProjectId, clientId,bidAmount and freelancerId  are required",
      });
    }
    const job = new Job({
      projectId: projectId,
      clientId: clientId,
      freelancerId: freelancerId,
      bidAmount: bidAmount,
      comment: comment,
      status: jobStatus.Pending,
    });
    await job.save();
    res.status(200).json({
      success: true,
      job,
      message: "Job assigned successfully",
    });
  } catch (error) {
    console.log(Error);
  }
};

const jobStatusUpdate = async (
  req: Request<
    any,
    JobStatusUpdateResponseBodyType | GenericResponseType,
    JobStatusUpdateRequestBodyType
  >,
  res: Response<JobStatusUpdateResponseBodyType | GenericResponseType>,
) => {
  try {
    const { jobId, status } = req.body;
    if (!jobId || !status) {
      return res.status(400).json({
        success: false,
        message: "JobId and status are required",
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }
    job.status = status;
    await job.save();
    res.status(200).json({
      success: true,
      job,
      message: "Job status updated successfully",
    });
  } catch (error) {
    console.log(Error);
  }
};

const showPendingJobStatus = async (
  req: Request<any, GenericResponseType | showPendingJobStatusResponseBodyType>,
  res: Response<showPendingJobStatusResponseBodyType | GenericResponseType>,
) => {
  try {
    const pendingJobs = await Job.find({ status: jobStatus.Pending });
    res.status(200).json({
      success: true,
      pendingjobs: pendingJobs,
      message: "Pending jobs fetched successfully",
    });
  } catch (error) {
    console.log(Error);
  }
};

const showActiveJobs = async (req: Request, res: Response) => {
  try {
    const assignedJobs = await Job.find({ status: jobStatus.Active });
    res.status(200).json({
      success: true,
      assignedJobs,
      message: "Assigned jobs fetched successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const completeWork = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "JobId is required",
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
      });
    }
    job.status = jobStatus.Complete;
    await job.save();
    res.status(200).json({
      success: true,
      job,
      message: "Job status updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  assignJob,
  jobStatusUpdate,
  showActiveJobs,
  showPendingJobStatus,
  completeWork,
};
