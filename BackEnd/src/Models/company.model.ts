import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the company schema
export interface ICompany {
  name: string;
  email: string;
  address: string; 
  contactNumber: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyModel extends ICompany, Document {
  _id: mongoose.Schema.Types.ObjectId;
}

// Define the schema for the company
const companySchema: Schema<ICompanyModel> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    logoUrl: {
      type: String,
      default: "https://default-url.com/default-logo.png",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Export the Company model
export const Company = mongoose.model<ICompanyModel>("Company", companySchema);
export default Company;
