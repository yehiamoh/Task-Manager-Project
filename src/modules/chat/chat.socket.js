import projectRepository from "../project/project.repository.js";
import chatRepository from "./chat.repository.js";
import chatService from "./chat.service.js";

export const handleJoinProject = async (socket, projectId) => {
  if (socket.currentProjectId) handleLeaveProject(socket);
  const project = await projectRepository.getById(projectId);
  if (!project) {
    socket.emit("error", { message: "This project doesn't exist" });
    return;
  }
  const member = await projectRepository.get(projectId, socket.user.id);
  if (!member) {
    socket.emit("error", { message: "You are not a member of this project" });
    return;
  }
  try {
    socket.join(`project-${projectId}`);
    socket.currentProjectId = projectId;

    socket.to(`project-${projectId}`).emit("user-joined", {
      user: socket.user.name,
      timestamp: Date.now(),
    });

    socket.emit("joined-project", { projectId });
  } catch (error) {
    socket.emit("error", { message: "Failed to join project" });
  }
};
export const handleSendMessage = async (socket, content) => {
  if (!content || content.trim() === "")
    return socket.emit("error", { message: "Message content is required" });

  const projectId = socket.currentProjectId;

  if (!projectId) {
    socket.emit("error", { message: "You must join a project" });
    return;
  }
  try {
    const savedMessage = await chatService.saveMessage(
      projectId,
      socket.user.id,
      content
    );

    socket.to(`project-${projectId}`).emit("new-message", {
      id: savedMessage.id,
      content,
      sender: {
        id: socket.user.id,
        name: socket.user.name,
      },
      timestamp: savedMessage.createdAt,
    });

    socket.emit("message-sent", {
      id: savedMessage.id,
      content,
      timestamp: savedMessage.createdAt,
    });
  } catch (error) {
    console.error("Save message error:", error);
    socket.emit("error", { message: "Failed to send message" });
  }
};
export const handleReplyToMessage = async (socket, replyToId, content) => {
  if (!content || content.trim() === "")
    return socket.emit("error", { message: "Message content is required" });

  const projectId = socket.currentProjectId;

  if (!projectId) {
    socket.emit("error", { message: "You must join a project" });
    return;
  }
  try {
    const savedMessage = await chatService.saveMessage(
      projectId,
      socket.user.id,
      content,
      replyToId
    );

    socket.to(`project-${projectId}`).emit("new-message", {
      id: savedMessage.id,
      content,
      sender: {
        id: socket.user.id,
        name: socket.user.name,
      },
      replyToId: savedMessage.replyToId,
      timestamp: savedMessage.createdAt,
    });

    socket.emit("message-sent", {
      id: savedMessage.id,
      content,
      replyToId: savedMessage.replyToId,
      timestamp: savedMessage.createdAt,
    });
  } catch (error) {
    console.error("Save message error:", error);
    socket.emit("error", { message: "Failed to send message" });
  }
};
export const handleEditMessage = async (socket, messageId, content) => {
  if (!content || content.trim() === "")
    return socket.emit("error", { message: "Message content is required" });

  const projectId = socket.currentProjectId;

  if (!projectId) {
    socket.emit("error", { message: "You must join a project" });
    return;
  }

  try {
    const editedMessage = await chatService.editMessage(
      projectId,
      messageId,
      socket.user.id,
      content
    );

    socket.to(`project-${projectId}`).emit("message-edited", {
      id: editedMessage.id,
      content: editedMessage.content,
      isEdited: editedMessage.isEdited,
      editedAt: editedMessage.editedAt,
      sender: {
        id: socket.user.id,
        name: socket.user.name,
      },
    });

    socket.emit("message-edit-confirmed", {
      id: editedMessage.id,
      content: editedMessage.content,
      editedAt: editedMessage.editedAt,
    });
  } catch (error) {
    console.error("Edit message error:", error);
    socket.emit("error", { message: "Failed to edit message" });
  }
};
export const handleDeleteMessage = async (socket, messageId) => {
  const projectId = socket.currentProjectId;

  if (!projectId) {
    socket.emit("error", { message: "You must join a project" });
    return;
  }

  try {
    await chatService.deleteMessage(projectId, messageId, socket.user.id);

    socket.to(`project-${projectId}`).emit("message-deleted", {
      id: messageId,
      deletedBy: {
        id: socket.user.id,
        name: socket.user.name,
      },
      timestamp: Date.now(),
    });

    socket.emit("message-delete-confirmed", {
      id: messageId,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Delete message error:", error);
    socket.emit("error", { message: "Failed to delete message" });
  }
};
export const handleLeaveProject = async (socket) => {
  if (socket.currentProjectId) {
    socket.leave(`project-${socket.currentProjectId}`);
    socket.to(`project-${socket.currentProjectId}`).emit("user-left", {
      user: socket.user.name,
      timestamp: Date.now(),
    });

    socket.currentProjectId = null;
    socket.emit("left-project");
  }
};

export const chatEvent = (io) => {
  io.on("connection", (socket) => {
    console.log(`${socket.user.name} connected`);

    socket.on("join-project", (projectId) =>
      handleJoinProject(socket, projectId)
    );
    socket.on("send-message", (content) => handleSendMessage(socket, content));
    socket.on("reply-to-message", (content, replyToId) =>
      handleReplyToMessage(socket, replyToId, content)
    );
    socket.on("edit-message", (messageId, content) =>
      handleEditMessage(socket, messageId, content)
    );
    socket.on("delete-message", (messageId) =>
      handleDeleteMessage(socket, messageId)
    );
    socket.on("leave-project", () => handleLeaveProject(socket));

    socket.on("disconnect", () => {
      console.log(`${socket.user.name} disconnected`);

      if (socket.currentProjectId) {
        socket.to(`project-${socket.currentProjectId}`).emit("user-left", {
          user: socket.user.name,
          timestamp: Date.now(),
        });
      }
    });
  });
};
