import express from "express";
import {
  getAllMembers,
  getMember,
  addMember,
  removeMember,
} from "./projectMembers.controller.js";
import { verifyLogin } from "../../middleware/auth.middleware.js";

const projectMembersRouter = express.Router();

projectMembersRouter
  .route("/project/:projectId/member")
  .get(verifyLogin, getAllMembers)
  .post(verifyLogin, addMember);

projectMembersRouter
  .route("/project/:projectId/member/:memberId")
  .get(verifyLogin, getMember)
  .delete(verifyLogin, removeMember);
export default projectMembersRouter;
