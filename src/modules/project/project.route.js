import express from "express";
import { verifyLogin } from "../../middleware/auth.middleware.js";
import {
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  inviteToProject,
} from "./project.controller.js";

const projectRouter = express.Router();

projectRouter
  .route("/project")
  .get(verifyLogin, getProjects)
  .post(verifyLogin, createProject);
projectRouter
  .route("/project/:projectId")
  .get(verifyLogin, getProject)
  .put(verifyLogin, updateProject)
  .delete(verifyLogin, deleteProject);

projectRouter.post("/project/:projectId/invite", verifyLogin, inviteToProject);
// projectRouter.post("/project/:projectId/confirm", verifyLogin, confirmInviteToProject);

export default projectRouter;
