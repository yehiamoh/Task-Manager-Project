import express from "express";

import {
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
  inviteToProject,
} from "./project.controller.js";

const projectRouter = express.Router();

projectRouter.route("/").get(getProjects).post(createProject);
projectRouter
  .route("/:projectId")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

projectRouter.post("/:projectId/invite", inviteToProject);

export default projectRouter;
