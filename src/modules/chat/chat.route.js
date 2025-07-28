import express from "express";
import { getChat, getChatMessages } from "./chat.controller.js";
import { verifyLogin } from "../../middleware/auth.middleware.js";
const chatRouter = express.Router();

chatRouter.route("/project/:projectId/chat").get(verifyLogin, getChat);
chatRouter
  .route("/project/:projectId/chat/messages")
  .get(verifyLogin, getChatMessages);

export default chatRouter;
