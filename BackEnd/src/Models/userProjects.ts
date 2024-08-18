import mongoose, { Document, Schema } from "mongoose";

export interface IUserProjects {
  userId: mongoose.Schema.Types.ObjectId;
  projectName: string;
  projectDescription: string;
  technolgiesUsed: mongoose.Schema.Types.ObjectId[];
  projectLink: string;
  projectStart: string;
  projectEnd: string;
}

export interface IUserProjectsModel extends IUserProjects, Document {
  _id: mongoose.Schema.Types.ObjectId;
}

const userProjectsSchema: Schema<IUserProjectsModel> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  projectName: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  technolgiesUsed: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Skill",
  },
  projectLink: {
    type: String,
    required: true,
  },
  projectStart: {
    type: String,
    required: true,
  },
  projectEnd: {
    type: String,
    required: true,
  },
});

export const UserProjects = mongoose.model<IUserProjectsModel>(
  "UserProjects",
  userProjectsSchema,
);
export default UserProjects;
