import {
  AddTaskInProjectRepository,
  AssignTaskByEmailRepository,
  DeleteTaskFromProjectRepository,
  GetTaskByIdReposiroty,
  UpdateTaskStatusRepository,
  GetTasksByProjectRepository,
} from "./task.repository.js";
import { getUserByEmail } from "../user/user.repository.js";
import { TaskStatus, TaskPriority } from "@prisma/client";
export const AddTaskInProjectService = async (task) => {
  await AddTaskInProjectRepository(task);
};

export const AssignTaskToUserByEmailService = async (email, taskId) => {
  const user = await getUserByEmail(email);
  if (user === null) {
    throw new Error("User Not Found");
  }
  await AssignTaskByEmailRepository(user, taskId);
};

export const DeleteTaskService = async (taskId) => {
  const task = await GetTaskByIdReposiroty(taskId);
  if (!task) {
    throw new Error("Task Not Found");
  }
  await DeleteTaskFromProjectRepository(taskId);
};

const IsValidStatus = (status) => Object.values(TaskStatus).includes(status);
const IsvalidPirority = (p) => Object.values(TaskPriority).includes(p);
export const UpdateStatusService = async (taskId, newStatus) => {
  const task = GetTaskByIdReposiroty(taskId);
  if (!task) {
    throw new Error("Task Not Found");
  }
  if (!IsValidStatus(newStatus)) {
    throw new Error("In Valid Status Name");
  }
  await UpdateTaskStatusRepository(task, newStatus);
};

export const GetTasksByProjectService = async (projectId, filters) => {
  return await GetTasksByProjectRepository(projectId, filters);
};

export const UpdateTaskDetailesService = async (taskId, data) => {
  if (data.status && !IsValidStatus(data.status)) {
    throw {
      statusCode: 400,
      message: `Invalid status. Must be one of: ${validStatus.join(", ")}`,
    };
  }

  if (data.priority && IsvalidPirority(data.priority)) {
    throw {
      statusCode: 400,
      message: `Invalid priority. Must be one of: ${validPriority.join(", ")}`,
    };
  }

  return await UpdateTaskDetails(taskId, data);
};
