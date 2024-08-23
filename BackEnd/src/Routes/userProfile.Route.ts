import { Router } from "express";
import {
  addProject,
  showAllProjects,
} from "../Controllers/userProfile.controller";

const router = Router();
router.route("/addproject").post(addProject);
router.route("/userprojects").post(showAllProjects);

export default router;
