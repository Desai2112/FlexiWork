import User from "../Models/user.model";
import Project from "../Models/job.model";
import { Request, Response } from "express";

const addJob = async (req: Request, res: Response) => {
  try {
    const clientId = req.session.user;
    console.log(clientId);
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
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ _id: clientId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const project = await Project.create({
      projectName: projectName,
      description: description,
      expectedTime: expectedTime,
      maxPrice: maxPrice,
      bidDuration: bidDuration,
      ClientId: clientId,
      requiredSkills: requiredSkills,
    });
    return res
      .status(200)
      .json({ message: "Project added successfully", success: true });
  } catch (error) {
    console.error("Error adding project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const showAllClientJobs = async (req: Request, res: Response) => {
  try {
    const clientId = req.session.user;
    const projects = await Project.find({
      deleted: false,
      ClientId: clientId,
    });
    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error showing projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addJob, showAllClientJobs };
