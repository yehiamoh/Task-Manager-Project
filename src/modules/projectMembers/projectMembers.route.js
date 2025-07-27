import express from "express";
import {
  getAllMembers,
  getMember,
  removeMember,
} from "./projectMembers.controller.js";
import { verifyLogin } from "../../middleware/auth.middleware.js";

const projectMembersRouter = express.Router();

projectMembersRouter
  .route("/project/:projectId/member")
  .get(verifyLogin, getAllMembers);

projectMembersRouter
  .route("/project/:projectId/member/:memberId")
  .get(verifyLogin, getMember)
  .delete(verifyLogin, removeMember);
export default projectMembersRouter;
