import { Router } from "express";
import {
  addJob,
  showAllClientJobs,
  showAllJobs,
  showAllAvailableJobs,
  showExpiredJobs,
  searchBySkill,
  searchJobsByName,
  viewProject,
} from "../Controllers/job.controller";
import isAuthenticated from "../Middlewares/isAuthenticated";
import isClient from "../Middlewares/isClient";
import isFreelancer from "../Middlewares/isFreelancer";
import { AddJobReqBody, showAllClientJobsResBody } from "../Schemas/job.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const router = Router();

router
  .route("/add")
  .post<any, GenericResponseType, AddJobReqBody>(
    isAuthenticated,
    isClient,
    addJob,
  );
router
  .route("/show")
  .get<any, GenericResponseType | showAllClientJobsResBody>(
    isAuthenticated,
    isClient,
    showAllClientJobs,
  );
router.route("/showall").get(isAuthenticated, showAllJobs);
router.route("/showavailable").get(isAuthenticated, showAllAvailableJobs);
router.route("/showexpired").get(isAuthenticated, showExpiredJobs);
router.route("/search/skill/:skillId").get(isAuthenticated, searchBySkill);
router.route("/search/name/:jobName").get(isAuthenticated, searchJobsByName);
router.route("/:projectId").get(isAuthenticated, viewProject);

export default router;
