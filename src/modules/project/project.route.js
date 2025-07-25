import express from "express";

import {
  getProjects,
  createProject,
  updateProject,
  getProject,
  deleteProject,
} from "./project.controller.js";

const projectRouter = express.Router();

projectRouter.route("/").get(getProjects).post(createProject);
projectRouter
  .route("/:id")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default projectRouter;
