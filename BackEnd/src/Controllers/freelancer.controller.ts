import { Request, Response, NextFunction } from "express";
import { Project } from "../Models/projects";
import {
  listAllProjectsResponseBodyType,
  searchByTagsRequestBodyType,
  searchByTagsResponseBodyType,
} from "../Schemas/freelancer.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";
import { ProjectTag } from "../Models/projecttags";

const searchByTags = async (
  req: Request<
    any,
    searchByTagsResponseBodyType | GenericResponseType,
    searchByTagsRequestBodyType
  >,
  res: Response<searchByTagsResponseBodyType | GenericResponseType>,
) => {
  try {
    const { tags } = req.body;
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        message: "Tags are required and should be an array",
        success: false,
      });
    }

    const projects = await ProjectTag.find({ tagId: { $in: tags } })
      .populate("tagId", "tagName description")
      .populate("projectId")
      .exec();

    const filteredProjects = projects.filter((project) => !project.deleted);

    if (filteredProjects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found", success: false });
    }
    // .populate("projectId")
    // .exec();
    console.log(projects);
    if (projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found", success: false });
    }

    res.status(200).json({
      message: "Projects fetched Successfully.",
      filteredProjects,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const listAllProjects = async (
  req: Request<any, listAllProjectsResponseBodyType | GenericResponseType>,
  res: Response<listAllProjectsResponseBodyType | GenericResponseType>,
) => {
  try {
    const projects = await Project.find({ deleted: false })
      .select(
        "projectName description minPrice maxPrice status completed createdAt updatedAt ClientId",
      )
      .populate("ClientId", "name email")
      .exec();

    if (projects.length === 0) {
      return res
        .status(404)
        .send({ message: "No projects found", success: false });
    }
    res.status(200).json({
      message: "Projects Data fetched successfully.",
      projects: projects,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
};

export { searchByTags, listAllProjects };
