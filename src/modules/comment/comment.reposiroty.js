import prisma from "../../config/database.js";

export const CreateCommentOnATask = async (taskId, userId, commentContent) => {
  return await prisma.comment.create({
    data: {
      taskId,
      userId,
      content: commentContent,
    },
  });
};

export const GetCommentByID = async (commentId) => {
  return await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      task: {
        select: {
          title: true,
          status: true,
        },
      },
      user: {
        select: {
          id: true,
          profileImage: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const GetAllCommentsOnATask = async (taskId, offset = 0, limit = 5) => {
  return await prisma.comment.findMany({
    where: {
      taskId: taskId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });
};

export const DeleteComment = async (commentId) => {
  return prisma.comment.delete({ where: { id: commentId } });
};
