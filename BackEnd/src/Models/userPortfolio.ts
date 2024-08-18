import mongoose, { Document, Schema } from "mongoose";

// Define interface for the subdocument schema
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

// Define interface for the main schema
export interface IUserPortfolio {
  userId: mongoose.Schema.Types.ObjectId;
  projects: IProjectDetails[];
  socialMediaLinks: ISocialMediaLinks;
}

// Define interface for the model
export interface IUserPortfolioModel extends IUserPortfolio, Document {
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
); // Disable _id field for subdocument

// Define the main schema
const userPortfolioSchema: Schema<IUserPortfolioModel> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    projects: [projectDetailsSchema], // Store projects as an array of subdocuments
    socialMediaLinks: {
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable version key (__v) field
  },
);

// Export the UserPortfolio model
export const UserPortfolio = mongoose.model<IUserPortfolioModel>(
  "UserPortfolio",
  userPortfolioSchema,
);
export default UserPortfolio;
