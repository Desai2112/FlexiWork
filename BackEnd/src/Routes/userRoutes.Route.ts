import { Router } from "express";
import {
  addUser,
  getAllSiklls,
  getDetails,
  loginUser,
  logOut,
  sendOtp,
  verifyOtp,
} from "../Controllers/user.controller";
import {
  loginBodyType,
  SignUpBodyType,
  loginResponseBodyType,
  SignUpResponseBodyType,
  MeResponseBodyType,
} from "../Schemas/user.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const router = Router();

router
  .route("/signup")
  .post<any, SignUpResponseBodyType | GenericResponseType, SignUpBodyType>(
    addUser,
  );

router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router
  .route("/login")
  .post<any, loginResponseBodyType | GenericResponseType, loginBodyType>(
    loginUser,
  );
router
  .route("/me")
  .get<any, MeResponseBodyType | GenericResponseType>(getDetails);

router.route("/logout").delete<any, GenericResponseType>(logOut);
router.route("/get-all-skills").get(getAllSiklls);

export default router;
