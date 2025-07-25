import prisma from "../../config/database.js";

export const AddTaskInProjectRepository = async (task) => {
  return await prisma.task.create({ data: task });
};

export const AssignTaskByEmailRepository = async (user, taskId) => {
  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      assignedTo: user.email,
    },
  });
};

export const DeleteTaskFromProjectRepository = async (id) => {
  return await prisma.task.delete({
    where: {
      id: id,
    },
  });
};

export const GetTaskByIdReposiroty = async (taskId) => {
  return await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
};

export const UpdateTaskStatusRepository = async (taskId, status) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: {
      status: status,
    },
  });
};

export const GetTasksByProjectRepository = async (
  projectId,
  { status, pirority }
) => {
  const whereClause = {
    projectId,
    ...(status && { status }),
    ...(pirority && { pirority }),
  };

  return await prisma.task.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const UpdateTaskDetailes = async (taskId, updateData) => {
  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...(updateData.title && { title: updateData.title }),
      ...(updateData.description && { description: updateData.description }),
      ...(updateData.priority && { priority: updateData.priority }),
      ...(updateData.dueDate && { dueDate: new Date(updateData.dueDate) }),
    },
  });
};
