import mongoose, { Schema, Document } from "mongoose";

export type ITag = {
  tagName: string;
  description: string;
  _id: Schema.Types.ObjectId;
};

export const tagSchema: Schema<ITag> = new Schema(
  {
    tagName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Tag = mongoose.model<ITag>("Tag", tagSchema);
