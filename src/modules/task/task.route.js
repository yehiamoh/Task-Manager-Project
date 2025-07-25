import {
  AddTaskInProjectController,
  AssignTaskByEmailController,
  DeleteTaskController,
  UpdateTaskStatusController,
  GetTasksBtProjectController,
  UpdateTaskDetailsController,
} from "./task.controller.js";
import express from "express";

const taskRouter = express.Router();

//Create Task In project
taskRouter.post("/projects/:projectId/tasks", AddTaskInProjectController);
// Get Tasks Fo Project Including Query on status and pirority
taskRouter.get("/projects/:projectId/tasks", GetTasksBtProjectController);

//Assign a task to a user by email
taskRouter.patch("/projects/tasks/:taskId/assign", AssignTaskByEmailController);
//delete task from project
taskRouter.delete("/projects/tasks/:taskId", DeleteTaskController);
// Change Status of task
taskRouter.put("/projects/tasks/:taskId", UpdateTaskStatusController);
// Upate Task Detailes
taskRouter.put("/projects/tasks/:taskId", UpdateTaskDetailsController);

export default taskRouter;
