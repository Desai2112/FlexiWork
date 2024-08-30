import mongoose, { Document, Schema } from "mongoose";

// Define interface for the project details subdocument
export interface IProjectDetails {
  projectName: string;
  projectDescription: string;
  technologiesUsed: mongoose.Schema.Types.ObjectId[];
  projectLink: string;
  projectStart: string;
  projectEnd: string;
}

// Define interface for the social media links
export interface ISocialMediaLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  personalWebsite?: string;
}

// Define interface for the freelancer schema
export interface IFreelancer {
  userId: mongoose.Schema.Types.ObjectId; // Reference to the User model
  bio?: string;
  skills: mongoose.Schema.Types.ObjectId[]; // Array of skill IDs
  projects: IProjectDetails[];
  socialMediaLinks: ISocialMediaLinks;
  moneyEarned: number;
  profilePicUrl?: string;
}

// Define interface for the model
export interface IFreelancerModel extends IFreelancer, Document {
  _id: mongoose.Schema.Types.ObjectId;
}

// Define the schema for project details subdocument
const projectDetailsSchema: Schema<IProjectDetails> = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    technologiesUsed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
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
  },
  { _id: false },
);

// Define the schema for social media links
const socialMediaLinksSchema: Schema<ISocialMediaLinks> = new Schema(
  {
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    personalWebsite: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

// Define the main freelancer schema
const freelancerSchema: Schema<IFreelancerModel> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bio: {
      type: String,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    projects: [projectDetailsSchema],
    socialMediaLinks: socialMediaLinksSchema,
    moneyEarned: {
      type: Number,
      default: 0,
      required: true,
    },
    profilePicUrl: {
      type: String,
      default: "https://default-url.com/default-profile-pic.png",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Export the Freelancer model
export const Freelancer = mongoose.model<IFreelancerModel>(
  "Freelancer",
  freelancerSchema,
);
export default Freelancer;
