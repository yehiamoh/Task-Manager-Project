import {
  CreateCommentOnATask,
  GetCommentByID,
  GetAllCommentsOnATask,
} from "./comment.reposiroty.js";
import { GetTaskByIdReposiroty } from "../task/task.repository.js";
import ApiError from "../../utils/api.error.js";
export const CreatCommentOnTaskService = async (
  taskId,
  userId,
  commentContent
) => {
  if (!userId) throw new ApiError(401, "User Is Not Authorized");
  if (!taskId || !commentContent)
    throw new ApiError(
      400,
      "Please Provide A proper comment content and taskID"
    );

  const IsTaskExists = await GetTaskByIdReposiroty(taskId);
  if (!IsTaskExists) throw new ApiError(404, "Task Not Found");

  return await CreateCommentOnATask(taskId, userId, commentContent);
};

export const GetCommentByIDService = async (commentId) => {
  if (!commentId)
    throw new ApiError(400, "Bad Request : Provide a Valid CommentID");

  const comment = await GetCommentByID(commentId);
  if (!comment) throw new ApiError(404, "Comment Not Found");
  return comment;
};

export const GetAllTasksOnCommentService = async (taskId, offest, limit) => {
  if (!taskId) throw new ApiError(400, "Bad Request : Provide a Valid taskId");
  const IsTaskExists = await GetTaskByIdReposiroty(taskId);
  if (!IsTaskExists) throw new ApiError(404, "Task Not Found");
  return await GetAllCommentsOnATask(taskId, offest, limit);
};
