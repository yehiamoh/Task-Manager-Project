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
import { isProjectOwner } from "../../middleware/isProjectOwner.middleware.js";

const projectRouter = express.Router();

projectRouter
  .route("/project")
  .post(verifyLogin, createProject)
  .get(verifyLogin, getProjects);

projectRouter.get(
  "/project/accept-invitation/:token",
  verifyLogin,
  acceptInvitation
);
projectRouter.post("/project/:projectId/invite", verifyLogin, sendInvite);

projectRouter
  .route("/project/:projectId")
  .get(verifyLogin, getProject)
  .put(verifyLogin, isProjectOwner, updateProject)
  .delete(verifyLogin, isProjectOwner, deleteProject);

export default projectRouter;
