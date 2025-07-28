import { GetTaskByIdReposiroty } from "../modules/task/task.repository.js";
import ApiError from "../utils/api.error.js";

export const isTaskOwner = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.user;
    const task = await GetTaskByIdReposiroty(taskId);

    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }

    if (task.createdBy !== userId) {
      return next(
        new ApiError(403, "You are not authorized to modify this task")
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
