import { Schema } from "mongoose";
import { IProject } from "../Models/projects";

type TagInfo = {
  tagName: string;
  description: string;
};

export type AddProjectRequestBody = {
  projectName: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  tags: TagInfo[];
};

type project = IProject;
export type AddProjectResponseBody = {
  message: string;
  project: project;
  success: Boolean;
};

export type ListAllProjectResponseBody = {
  message: string;
  projects: project[];
  success: Boolean;
};

export type deleteProjectRequestBody = {
  projectId: Schema.Types.ObjectId;
};

export type deleteProjectResponseBody = {
  message: string;
  success: Boolean;
};
