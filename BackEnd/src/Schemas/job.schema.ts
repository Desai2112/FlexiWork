import { IJobModel } from "../Models/job.model";

export type AddJobReqBody = {
  projectName: string;
  description: string;
  maxPrice: number;
  expectedTime: number;
  bidDuration: number;
  requiredSkills: string[];
  clientId: string;
};

export type showAllClientJobsResBody = {
  message: string;
  success: boolean;
  Projects: IJobModel[];
};
