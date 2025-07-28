import ApiError from "../../utils/api.error.js";
import projectRepository from "../project/project.repository.js";
import chatRepository from "./chat.repository.js";

class chatService {
  async getChat(projectId, userId) {
    const project = await projectRepository.getById(projectId);

    if (!project) throw new ApiError(404, "This project doesn't exits");
    const member = await projectRepository.get(projectId, userId);
    if (!member)
      throw new ApiError(404, "This user isn't a member in this project");
    const chat = await chatRepository.getChat(projectId);
    return chat;
  }

  async getChatMessages(projectId, userId) {
    const project = await projectRepository.getById(projectId);

    if (!project) throw new ApiError(404, "This project doesn't exits");
    const member = await projectRepository.get(projectId, userId);
    if (!member)
      throw new ApiError(404, "This user isn't a member in this project");
    const message = await chatRepository.getChatMessages(projectId);
    return message;
  }

  async saveMessage(projectId, userId, content, replyToId = null) {
    const project = await projectRepository.getById(projectId);

    if (!project) throw new ApiError(404, "This project doesn't exits");
    const member = await projectRepository.get(projectId, userId);
    if (!member)
      throw new ApiError(404, "This user isn't a member in this project");
    if (replyToId) {
      const replyToMessage = await chatRepository.getMessageById(replyToId);
      if (!replyToMessage)
        throw new ApiError(404, "This message doesn't exist");
      if (project.id !== replyToMessage.chat.projectId)
        throw new ApiError(
          400,
          "Cannot reply to a message from a different project"
        );
    }
    const message = await chatRepository.saveMessage(
      project.chat.id,
      userId,
      content,
      replyToId
    );
    return message;
  }
  async editMessage(projectId, messageId, userId, content) {
    const message = await chatRepository.getMessageById(messageId);
    if (!message) throw new ApiError(404, "This message doesn't exist");
    if (message.chat.projectId !== projectId)
      throw new ApiError(404, "This message doesn't belong to this project");
    if (message.senderId != userId)
      throw new ApiError(403, "This user not authorized to edit this message");
    const editedMessage = await chatRepository.editMessage(messageId, content);
    return editedMessage;
  }

  async deleteMessage(projectId, messageId, userId) {
    const message = await chatRepository.getMessageById(messageId);
    if (!message) throw new ApiError(404, "This message doesn't exist");
    if (message.chat.projectId !== projectId)
      throw new ApiError(404, "This message doesn't belong to this project");
    if (message.senderId != userId)
      throw new ApiError(
        403,
        "This user not authorized to delete this message"
      );
    const deletedMessage = await chatRepository.deleteMessage(messageId);
    return deletedMessage;
  }
}

export default new chatService();
