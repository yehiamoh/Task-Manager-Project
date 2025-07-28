import {
  CreateCommentController,
  DeleteCommentController,
  GetAllCommentsOnATaskController,
  GetCommentByIDController,
} from "./comment.controller.js";
import { verifyLogin } from "../../middleware/auth.middleware.js";
import express from "express";
import { isProjectOwner } from "../../middleware/isProjectOwner.middleware.js";
import { isProjectMember } from "../../middleware/isProjectMember.middleware.js";
import { isCommentAuthor } from "../../middleware/isCommentAuthor.middleware.js";
const commentRouter = express.Router();

commentRouter.use(verifyLogin);
commentRouter.use(isProjectMember);
commentRouter.post("/comments", CreateCommentController);
commentRouter.get("/comments/:commentId", GetCommentByIDController);
commentRouter.get("/:taskId/comments", GetAllCommentsOnATaskController);
commentRouter.delete(
  "/comments/:commentId",
  isCommentAuthor,
  DeleteCommentController
);

export default commentRouter;
