import { Router } from "express";
import {
  addUser,
  getDetails,
  loginUser,
  logOut,
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
router
  .route("/login")
  .post<any, loginResponseBodyType | GenericResponseType, loginBodyType>(
    loginUser,
  );
router
  .route("/me")
  .get<any, MeResponseBodyType | GenericResponseType>(getDetails);

router.route("/logout").delete<any, GenericResponseType>(logOut);

export default router;
