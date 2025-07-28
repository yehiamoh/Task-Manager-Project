import { verifyLogin } from "../../middleware/auth.middleware.js";
import { isProjectMember } from "../../middleware/isProjectMember.middleware.js";
import { isProjectOwner } from "../../middleware/isProjectOwner.middleware.js";
import { isTaskOwner } from "../../middleware/isTaskOwner.middleware.js";
import {
  AddTaskInProjectController,
  AssignTaskByEmailController,
  DeleteTaskController,
  UpdateTaskStatusController,
  GetTasksByProjectController,
  UpdateTaskDetailsController,
} from "./task.controller.js";
import express from "express";

const taskRouter = express.Router();

taskRouter.use(verifyLogin);
taskRouter.use(isProjectMember);

//Create Task In project
taskRouter.post("/projects/:projectId/tasks", AddTaskInProjectController);
// Get Tasks Fo Project Including Query on status and pirority
taskRouter.get("/projects/:projectId/tasks", GetTasksByProjectController);

//Assign a task to a user by email
taskRouter.patch(
  "/projects/tasks/:taskId/assign",
  isProjectOwner,
  AssignTaskByEmailController
);
//delete task from project
taskRouter.delete("/projects/tasks/:taskId", isTaskOwner, DeleteTaskController);
// Change Status of task
taskRouter.put(
  "/projects/tasks/:taskId",
  isTaskOwner,
  UpdateTaskStatusController
);
// Upate Task Detailes
taskRouter.put(
  "/projects/tasks/:taskId",
  isTaskOwner,
  UpdateTaskDetailsController
);

export default taskRouter;
