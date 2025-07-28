import { GetCommentByID } from "../modules/comment/comment.reposiroty.js";
import ApiError from "../utils/api.error.js";

export const isCommentAuthor = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId || req.user.userID;
    const comment = await GetCommentByID(commentId);

    if (!comment) {
      return next(new ApiError(404, "Comment not found"));
    }

    if (comment.userId !== userId) {
      return next(
        new ApiError(403, "You are not authorized to modify this comment")
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
