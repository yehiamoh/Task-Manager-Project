import { Register, Login } from "./auth.controller.js";
import express from "express";
const authRouter = express.Router();

authRouter.post("/auth/register", Register);
authRouter.post("/auth/login", Login);

export default authRouter;
