import { Date, Schema } from "mongoose";
import { IProject, ProjectStatus } from "../Models/projects";
// import { ITag } from "../Models/skills";
import { IProjectTag } from "../Models/projecttags";

export type searchByTagsRequestBodyType = {
  tags: Schema.Types.ObjectId[];
};

type PopulatedTag = Document & {
  _id: Schema.Types.ObjectId;
  tagName: string;
};

type PopulatedClient = Document & {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
};

type project = IProject;
export type listAllProjectsResponseBodyType = {
  message: string;
  projects: project[];
  success: Boolean;
};

type TagId = {
  _id: Schema.Types.ObjectId;
  tagName: string;
  description: string;
};

type ProjectId = {
  _id: Schema.Types.ObjectId;
  projectName: string;
  description: string;
  status: ProjectStatus;
  completed: boolean;
  deleted: boolean;
  minPrice: number;
  maxPrice: number;
  ClientId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

// export type IProjectTag = {
//   _id: Schema.Types.ObjectId;
//   tagId: ITag;
//   projectId: IProject;
//   deleted: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// };

export type searchByTagsResponseBodyType = {
  message: string;
  filteredProjects: IProjectTag[];
  success: Boolean;
};
