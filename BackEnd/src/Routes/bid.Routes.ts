import { Router } from "express";
import {
  addBid,
  showProjectBid,
  acceptJobBid,
} from "../Controllers/bid.controller";
import isAuthenticated from "../Middlewares/isAuthenticated";
import isFreelancer from "../Middlewares/isFreelancer";
import isClient from "../Middlewares/isClient";

const router = Router();

router.route("/addbid").post(isAuthenticated, isFreelancer, addBid);
router.route("/showbids/:jobId").get(isAuthenticated, isClient, showProjectBid);
router.route("/acceptbid/:bidId").post(isAuthenticated, isClient, acceptJobBid);

export default router;
