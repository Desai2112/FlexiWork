import Skill from "../Models/skills.model";
import { Request, Response } from "express";
import { GenericResponseType } from "../Schemas/genericResponse.schema";
import { GetAllSikllsResBody } from "../Schemas/common.schema";

const getAllSiklls = async (
  req: Request<any, GenericResponseType | GetAllSikllsResBody>,
  res: Response<GenericResponseType | GetAllSikllsResBody>,
) => {
  try {
    const skills = await Skill.find();
    if (!skills) {
      return res.status(404).json({
        message: "No skills found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Skills found",
      skills,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
};

export { getAllSiklls };
