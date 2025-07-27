import {
  CreatCommentOnTaskService,
  GetCommentByIDService,
  GetAllTasksOnCommentService,
} from "./comment.service.js";

export const CreateCommentController = async (req, res, next) => {
  try {
    const { userID } = req.user;
    const { content, taskID } = req.body;

    const comment = await CreatCommentOnTaskService(taskID, userID, content);

    const commentResponse = {
      status: "success",
      message: "Comment Created Successfully",
      data: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
      },
    };

    res.status(201).json(commentResponse);
  } catch (error) {
    next(error);
  }
};

export const GetCommentByIDController = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await GetCommentByIDService(commentId);

    const commentResponse = {
      tatus: "success",
      message: "Comment Created Successfully",
      data: {
        comment,
      },
    };
    res.status(200).json(commentResponse);
  } catch (error) {
    next(error);
  }
};

export const GetAllCommentsOnATaskController = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const { taskId } = req.params;

    const comments = await GetAllTasksOnCommentService(taskId, offset, limit);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
