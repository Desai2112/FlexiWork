import { Request, Response, NextFunction } from "express";
import { Project, ProjectStatus } from "../Models/projects";
import { Schema } from "mongoose";
import { Tag } from "../Models/tags";
import {
  AddProjectRequestBody,
  AddProjectResponseBody,
  deleteProjectRequestBody,
  deleteProjectResponseBody,
  ListAllProjectResponseBody,
} from "../Schemas/client.schema";
import { ProjectTag } from "../Models/projecttags";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const addProject = async (
  req: Request<
    any,
    AddProjectResponseBody | GenericResponseType,
    AddProjectRequestBody
  >,
  res: Response<AddProjectResponseBody | GenericResponseType>,
  next: NextFunction,
) => {
  try {
    const { projectName, description, minPrice, maxPrice, tags } = req.body;

    if (!projectName || !description || !minPrice || !maxPrice || !tags) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const userId = req.session.user;

    const project = new Project({
      projectName: projectName,
      description: description,
      minPrice: minPrice,
      maxPrice: maxPrice,
      ClientId: userId,
      status: ProjectStatus.Pending,
    });

    const tagIds: Schema.Types.ObjectId[] = [];
    for (const tag of tags) {
      const tagInfo = await Tag.findOne({ tagName: tag.tagName });
      if (!tagInfo) {
        const newTag = new Tag({
          tagName: tag.tagName,
          description: tag.description,
        });
        await newTag.save();
        tagIds.push(newTag._id);
      } else {
        tagIds.push(tagInfo._id);
      }
    }
    await project.save();
    const projectTags = await ProjectTag.insertMany(
      tagIds.map((tagId) => ({
        projectId: project._id,
        tagId: tagId,
      })),
    );
    if (!projectTags) {
      return res
        .status(500)
        .json({ message: "Error adding project tags", success: false });
    }
    res.status(201).json({
      message: "Project created successfully",
      project,
      success: true,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const listAllProjects = async (
  req: Request<any, ListAllProjectResponseBody | GenericResponseType>,
  res: Response<ListAllProjectResponseBody | GenericResponseType>,
) => {
  try {
    const userId = req.session.user;
    const projects = await Project.find({ ClientId: userId, deleted: false })
      .select(
        "projectName description minPrice maxPrice status completed createdAt updatedAt",
      )
      // .populate("tags", "tagName description")
      .populate("ClientId", "name email");
    if (projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found", success: false });
    }

    return res
      .status(200)
      .json({ message: "No projects found", projects, success: false });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send({ message: "Internal Server Error", success: false });
  }
};

const deleteProject = async (
  req: Request<
    any,
    deleteProjectResponseBody | GenericResponseType,
    deleteProjectRequestBody
  >,
  res: Response<deleteProjectResponseBody | GenericResponseType>,
) => {
  const { projectId } = req.body;
  const project = await Project.findById(projectId);
  if (!Project || project?.deleted) {
    return res
      .status(400)
      .json({ message: "Project not found", success: false });
  }
  await Project.findOneAndUpdate(
    { _id: projectId, ClientId: req.session.user },
    { deleted: true },
  );
  await ProjectTag.updateMany({ projectId: projectId }, { deleted: true });
  return res
    .status(200)
    .json({ message: "Project deleted successfully", success: true });
};

export { addProject, listAllProjects, deleteProject };
