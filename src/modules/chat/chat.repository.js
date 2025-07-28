import prisma from "../../config/database.js";
import projectRepository from "../project/project.repository.js";

class chatRepository {
  async getChat(projectId) {
    return await prisma.chat.findUnique({
      where: {
        projectId: projectId,
      },
      include: {
        owningProject: true,
      },
    });
  }
  async getChatMessages(projectId) {
    return await prisma.chat.findUnique({
      where: {
        projectId: projectId,
      },
      select: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: "desc" },
          take: 50,
        },
      },
    });
  }
  async deleteChat(chatId) {
    return await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });
  }
  async saveMessage(chatId, senderId, content, replyToId = null) {
    return await prisma.chatMessage.create({
      data: {
        chatId,
        senderId,
        replyToId,
        content,
      },
      include: {
        sender: true,
      },
    });
  }
  async getMessageById(messageId) {
    return await prisma.chatMessage.findUnique({
      where: { id: messageId },
      include: {
        sender: true,
        chat: {
          select: { projectId: true },
        },
      },
    });
  }
  async editMessage(id, content) {
    return await prisma.chatMessage.update({
      where: { id },
      data: {
        content,
        isEdited: true,
        editedAt: new Date(),
      },
      include: {
        sender: true,
        chat: true,
      },
    });
  }
  async deleteMessage(id) {
    await prisma.chatMessage.updateMany({
      where: { replyToId: id },
      data: { replyToId: null },
    });
    return await prisma.chatMessage.delete({
      where: { id },
    });
  }
}

export default new chatRepository();
