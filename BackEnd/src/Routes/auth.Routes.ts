import { Router } from "express";
import {
  addUser,
  getDetails,
  loginUser,
  logOut,
  resetPassword,
  resetPasswordEmail,
  sendOtp,
  verifyOtp,
  verifyPasstoken,
} from "../Controllers/auth.controller";
import {
  loginBodyType,
  loginResponseBodyType,
  MeResponseBodyType,
  SendOTPReqBodyType,
  VerifyOTPReqBodyType,
  ResetPasswordEmailReqBodyType,
  ResetPasswordReqBodyType,
  VerifyPasstokenReqBody,
  AddUserReqBody,
} from "../Schemas/auth.schema";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const router = Router();

router.route("/signup").post<any, GenericResponseType, AddUserReqBody>(addUser);

router
  .route("/send-otp")
  .post<any, GenericResponseType, SendOTPReqBodyType>(sendOtp);

router
  .route("/verify-otp")
  .post<any, GenericResponseType, VerifyOTPReqBodyType>(verifyOtp);

router
  .route("/login")
  .post<any, loginResponseBodyType | GenericResponseType, loginBodyType>(
    loginUser,
  );

router
  .route("/me")
  .get<any, MeResponseBodyType | GenericResponseType>(getDetails);

router.route("/logout").delete<any, GenericResponseType>(logOut);

router
  .route("/send-reset-link")
  .post<any, GenericResponseType, ResetPasswordEmailReqBodyType>(
    resetPasswordEmail,
  );

router
  .route("/reset-password")
  .put<any, GenericResponseType, ResetPasswordReqBodyType>(resetPassword);

router
  .route("/password-token-verify")
  .post<any, GenericResponseType, VerifyPasstokenReqBody>(verifyPasstoken);

export default router;
