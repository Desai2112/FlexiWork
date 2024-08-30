import User from "../Models/user.model";
import Job, { JobStatus } from "../Models/job.model";
import { Request, Response } from "express";
import { GenericResponseType } from "../Schemas/genericResponse.schema";
import { AddJobReqBody, showAllClientJobsResBody } from "../Schemas/job.schema";

const addJob = async (
  req: Request<any, GenericResponseType, AddJobReqBody>,
  res: Response<GenericResponseType>,
) => {
  try {
    const clientId = req.session.user;
    const {
      projectName,
      description,
      maxPrice,
      expectedTime,
      bidDuration,
      requiredSkills,
    } = req.body;
    if (
      !clientId ||
      !projectName ||
      !description ||
      !maxPrice ||
      !expectedTime ||
      !bidDuration ||
      !requiredSkills
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }
    const user = await User.findOne({ _id: clientId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const bidEnds = new Date(
      new Date().getTime() + bidDuration * 24 * 60 * 60 * 1000,
    );
    const project = await Job.create({
      projectName: projectName,
      description: description,
      expectedTime: expectedTime,
      maxPrice: maxPrice,
      bidDuration: bidDuration,
      ClientId: clientId,
      bidEnds: bidEnds,
      requiredSkills: requiredSkills,
    });
    return res
      .status(200)
      .json({ message: "Project added successfully", success: true });
  } catch (error) {
    console.error("Error adding project:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const showAllClientJobs = async (
  req: Request<any, GenericResponseType | showAllClientJobsResBody>,
  res: Response<GenericResponseType | showAllClientJobsResBody>,
) => {
  try {
    const clientId = req.session.user;
    const projects = await Job.find({
      deleted: false,
      ClientId: clientId,
    }).select(
      "projectName description maxPrice expectedTime bidDuration requiredSkills status bids",
    );
    return res.status(200).json({
      message: "Projects Fetched Successfully",
      Projects: projects,
      success: true,
    });
  } catch (error) {
    console.error("Error showing projects:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// TODO: Complete type of this after frontend completes
const showAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({ deleted: false });
    return res
      .status(200)
      .json({ message: "Jobs fetched Successfully.", success: true, jobs });
  } catch (error) {
    console.log("Something went wrong", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const showAllAvailableJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({
      deleted: false,
      bidEnds: { $gt: new Date() },
    });
    return res
      .status(200)
      .json({ message: "Jobs fetched Successfully.", success: true, jobs });
  } catch (error) {
    console.log("Something went wrong", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const showExpiredJobs = async (req: Request, res: Response) => {
  try {
    const currentTime = new Date();
    const expired = await Job.updateMany(
      {
        bidEnds: { $lt: currentTime },
        deleted: false,
      },
      {
        status: JobStatus.Expired,
      },
    );

    const expiredJobs = await Job.find({
      status: JobStatus.Expired,
      deleted: false,
    });

    return res.status(200).json({
      message: "Expired jobs fetched successfully.",
      success: true,
      jobs: expiredJobs,
    });
  } catch (error) {
    console.error("Error fetching expired jobs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const searchBySkill = async (req: Request, res: Response) => {
  try {
    const { skillId } = req.params;
    const jobs = await Job.find({
      requiredSkills: { $in: [skillId] },
      deleted: false,
      status: "new",
    });
    return res
      .status(200)
      .json({ message: "Jobs fetched Successfully.", success: true, jobs });
  } catch (error) {
    console.log("Something went wrong", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const searchJobsByName = async (req: Request, res: Response) => {
  try {
    const { jobName } = req.params;

    if (!jobName) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const regex = new RegExp(jobName, "i");
    const jobs = await Job.find({
      projectName: { $regex: regex },
      deleted: false,
    })
      .select(
        "projectName description maxPrice expectedTime bidDuration requiredSkills",
      )
      .populate("ClientId", "firstName lastName email")
      .populate("requiredSkills", "skill -_id");

    return res.status(200).json({
      message: "Jobs fetched successfully.",
      success: true,
      jobs: jobs,
    });
  } catch (error) {
    console.log("Something went wrong", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const viewProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Job.findById(projectId)
      .populate("requiredSkills", "skill")
      .populate("bids", "freelancerName description bidAmount")
      .populate("ClientId", "companyName email");
    if (!project) {
      return res
        .status(400)
        .json({ message: "Project not found", success: false });
    }
    return res.status(200).json({ project, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export {
  addJob,
  showAllClientJobs,
  showAllJobs,
  showAllAvailableJobs,
  showExpiredJobs,
  searchBySkill,
  searchJobsByName,
  viewProject,
};
