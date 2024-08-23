import { Router } from "express";
import {
  addBid,
  showProjectBid,
  acceptJobBid,
} from "../Controllers/bid.controller";

const router = Router();

router.route("/addbid").post(addBid);
router.route("/showbids/:jobId").get(showProjectBid);
router.route("/acceptbid/:bidId").post(acceptJobBid);

export default router;
