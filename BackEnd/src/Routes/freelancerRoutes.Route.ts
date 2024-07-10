import { Router } from "express";
import isAuthenticated from "../Middlewares/isAuthenticated";
import isFreelancer from "../Middlewares/isFreelancer";
import {
  searchByTags,
  listAllProjects,
} from "../Controllers/freelancer.controller";
import {
  listAllProjectsResponseBodyType,
  searchByTagsRequestBodyType,
} from "../Schemas/freelancer.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const router = Router();

router
  .route("/findbytag")
  .post<any, any, searchByTagsRequestBodyType>(
    isAuthenticated,
    isFreelancer,
    searchByTags,
  );
router
  .route("/listall")
  .get<any, listAllProjectsResponseBodyType | GenericResponseType>(
    isAuthenticated,
    isFreelancer,
    listAllProjects,
  );

export default router;
