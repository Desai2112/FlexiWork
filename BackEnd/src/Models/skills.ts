import mongoose, { Schema, Document } from "mongoose";

export type ISkill = {
  skill: string;
  description: string;
  _id: Schema.Types.ObjectId;
};

export const skillSchema: Schema<ISkill> = new Schema(
  {
    skill: {
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

export const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
