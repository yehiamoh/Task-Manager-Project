import express from "express";
import { verifyLogin } from "../../middleware/auth.middleware.js";
import {
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  sendInvite,
  acceptInvitation,
} from "./project.controller.js";

const projectRouter = express.Router();

projectRouter
  .route("/project")
  .get(verifyLogin, getProjects)
  .post(verifyLogin, createProject);

projectRouter.get(
  "/project/accept-invitation/:token",
  verifyLogin,
  acceptInvitation
);
projectRouter.post("/project/:projectId/invite", verifyLogin, sendInvite);

projectRouter
  .route("/project/:projectId")
  .get(verifyLogin, getProject)
  .put(verifyLogin, updateProject)
  .delete(verifyLogin, deleteProject);

export default projectRouter;
