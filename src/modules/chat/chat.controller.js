import asyncHandler from "../../utils/asyncHandler.js";
import chatService from "./chat.service.js";

export const getChat = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.user;

  const chat = await chatService.getChat(projectId, userId);

  res.status(200).json({
    success: true,
    message: "Chat retrieved successfully",
    data: chat,
  });
});

export const getChatMessages = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.user;

  const chat = await chatService.getChatMessages(projectId, userId);

  res.status(200).json({
    success: true,
    message: "Chat retrieved successfully",
    data: chat,
  });
});
