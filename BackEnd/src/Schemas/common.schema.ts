import { ISkill } from "../Models/skills.model";

export type GetAllSikllsResBody = {
  message: string;
  skills: ISkill[];
  success: Boolean;
};
