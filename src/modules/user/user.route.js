import express from "express";
import {
  getAllUsers,
  getUserByEmail,
  getUserProfile,
} from "./user.controller.js";
import { verifyLogin } from "../../middleware/auth.middleware.js";
const userRouter = express.Router();

userRouter.route("/user").get(getAllUsers).post(getUserByEmail);
userRouter.get("/user/profile", verifyLogin, getUserProfile);
export default userRouter;
