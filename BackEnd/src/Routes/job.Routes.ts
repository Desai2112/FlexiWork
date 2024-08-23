import { Router } from "express";
import { addJob, showAllClientJobs } from "../Controllers/job.controller";

const router = Router();

router.post("/add", addJob);
router.get("/show", showAllClientJobs);

export default router;
