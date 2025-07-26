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
import ApiError from "../../utils/api.error.js";

export const AddTaskInProjectService = async (task) => {
  try {
    return await AddTaskInProjectRepository(task);
  } catch (error) {
    throw new ApiError(500, "Error adding task to project", [error.message]);
  }
};

export const AssignTaskToUserByEmailService = async (email, taskId) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ApiError(404, "User not found", [
        `User with email ${email} does not exist`,
      ]);
    }

    return await AssignTaskByEmailRepository(user, taskId);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Error assigning task to user", [error.message]);
  }
};

export const DeleteTaskService = async (taskId) => {
  try {
    const task = await GetTaskByIdReposiroty(taskId);
    if (!task) {
      throw new ApiError(404, "Task not found", [
        `Task with id ${taskId} does not exist`,
      ]);
    }

    return await DeleteTaskFromProjectRepository(taskId);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Error deleting task", [error.message]);
  }
};

const IsValidStatus = (status) => Object.values(TaskStatus).includes(status);
const IsvalidPirority = (p) => Object.values(TaskPriority).includes(p);

export const UpdateStatusService = async (taskId, newStatus) => {
  try {
    const task = await GetTaskByIdReposiroty(taskId);
    if (!task) {
      throw new ApiError(404, "Task not found", [
        `Task with id ${taskId} does not exist`,
      ]);
    }

    if (!IsValidStatus(newStatus)) {
      throw new ApiError(400, "Invalid status", [
        `Status '${newStatus}' is not valid`,
      ]);
    }

    return await UpdateTaskStatusRepository(task, newStatus);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Error updating task status", [error.message]);
  }
};

export const GetTasksByProjectService = async (projectId, filters) => {
  try {
    return await GetTasksByProjectRepository(projectId, filters);
  } catch (error) {
    throw new ApiError(500, "Error fetching tasks", [error.message]);
  }
};

export const UpdateTaskDetailesService = async (taskId, data) => {
  try {
    if (data.status && !IsValidStatus(data.status)) {
      throw new ApiError(400, "Invalid status", [
        `Status '${data.status}' is not valid`,
      ]);
    }

    if (data.priority && !IsvalidPirority(data.priority)) {
      throw new ApiError(400, "Invalid priority", [
        `Priority '${data.priority}' is not valid`,
      ]);
    }

    return await UpdateTaskDetails(taskId, data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Error updating task details", [error.message]);
  }
};
