import { Router } from "express";
import { GenericResponseType } from "../Schemas/genericResponse.schema";
import { getAllSiklls } from "../Controllers/common.controller";
import { GetAllSikllsResBody } from "../Schemas/common.schema";

const router = Router();

router
  .route("/skills")
  .get<any, GenericResponseType | GetAllSikllsResBody>(getAllSiklls);

export default router;
