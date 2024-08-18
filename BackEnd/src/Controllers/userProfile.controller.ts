import { Request, Response } from "express";
import { UserPortfolio } from "../Models/userPortfolio";
import User from "../Models/user";

const addProject = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      projectName,
      projectDescription,
      technologiesUsed,
      projectLink,
      projectStart,
      projectEnd,
    } = req.body;

    if (
      !userId ||
      !projectName ||
      !projectDescription ||
      !projectLink ||
      !projectStart ||
      !projectEnd
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newProject = {
      projectName,
      projectDescription,
      technologiesUsed,
      projectLink,
      projectStart,
      projectEnd,
    };

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const userPortfolio = await UserPortfolio.findOne({ userId: userId });
    if (!userPortfolio) {
      await UserPortfolio.create({
        userId: userId,
        projects: [newProject],
      });
    } else {
      userPortfolio.projects.push(newProject);
      await userPortfolio.save();
    }
    return res
      .status(200)
      .json({ message: "Project added successfully", success: true });
  } catch (error) {
    console.error("Error adding project:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const showAllProjects = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userPortfolio = await UserPortfolio.findOne({ userId: userId });
    if (!userPortfolio) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    return res
      .status(200)
      .json({ projects: userPortfolio.projects, success: true });
  } catch (error) {
    console.error("Error showing projects:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req: Request, res: Response) => {};
export { addProject, showAllProjects };
