import { Router } from "express";
import {
  // addProject,
  listAllProjects,
  deleteProject,
} from "../Controllers/client.controller";
import isAuthenticated from "../Middlewares/isAuthenticated";
import isClient from "../Middlewares/isClient";
import {
  AddProjectRequestBody,
  AddProjectResponseBody,
} from "../Schemas/client.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const router = Router();

// router
//   .route("/add")
//   .post<
//     any,
//     AddProjectResponseBody | GenericResponseType,
//     AddProjectRequestBody
//   >(isAuthenticated, isClient, addProject);
router.route("/listall").get(isAuthenticated, isClient, listAllProjects);
router.route("/delete").delete(isAuthenticated, isClient, deleteProject);

export default router;
