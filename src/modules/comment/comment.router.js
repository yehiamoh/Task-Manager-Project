import {
  CreateCommentController,
  GetAllCommentsOnATaskController,
  GetCommentByIDController,
} from "./comment.controller.js";
import { verifyLogin } from "../../middleware/auth.middleware.js";
import express from "express";

const commentRouter = express.Router();

commentRouter.use(verifyLogin);

commentRouter.post("/comments", CreateCommentController);
commentRouter.get("/comments/:commentId", GetCommentByIDController);
commentRouter.get("/:taskId/comments", GetAllCommentsOnATaskController);

export default commentRouter;
