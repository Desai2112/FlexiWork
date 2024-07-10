import mongoose, { Schema, Document } from "mongoose";

export type IProjectTag = {
  tagId: Schema.Types.ObjectId;
  projectId: Schema.Types.ObjectId;
  _id: Schema.Types.ObjectId;
  deleted: boolean;
};

export const projectTagSchema: Schema<IProjectTag> = new Schema(
  {
    tagId: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ProjectTag = mongoose.model<IProjectTag>(
  "ProjectTag",
  projectTagSchema,
);
