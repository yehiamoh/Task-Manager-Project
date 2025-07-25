import express from "express";
import { getAllUsers, createUser } from "./user.controller.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);

export default userRouter;
