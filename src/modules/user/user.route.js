import express from "express";
import { getAllUsers, getUserByEmail } from "./user.controller.js";

const userRouter = express.Router();

userRouter.route("/user").get(getAllUsers).post(getUserByEmail);

export default userRouter;
