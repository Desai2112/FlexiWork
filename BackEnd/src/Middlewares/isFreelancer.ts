import { Request, Response, NextFunction } from "express";
import { User } from "../Models/user";
import { GenericResponseType } from "../Schemas/genericResponse.schema";

const isFreelancer = async (
  req: Request,
  res: Response<GenericResponseType>,
  next: NextFunction,
) => {
  if (req.session && req.session.user) {
    const userId = req.session.user;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (existingUser.role === "freelancer") next();
    else {
      return res
        .status(401)
        .json({ message: "Not a freelancer Unauthorized", success: false });
    }
  } else {
    res.status(401).json({ message: "Unauthorized", success: false });
  }
};

export default isFreelancer;
