import prisma from "../../config/database.js";

class ProjectRepository {
  async getAll(userId) {
    return await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId }, // User is the owner
          {
            members: {
              some: {
                userId: userId, // User is a member
              },
            },
          },
        ],
      },
      include: {
        tasks: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async getById(projectId) {
    return await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        tasks: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
        chat: true,
      },
    });
  }

  async get(projectId, userId) {
    return await prisma.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { ownerId: userId },
          {
            members: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      include: {
        tasks: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
        chat: true,
      },
    });
  }

  async create(projectData, userId) {
    const { name, description } = projectData;
    return await prisma.project.create({
      data: {
        name,
        ownerId: userId,
        description,
        chat: {
          create: {
            type: "project",
          },
        },
      },
      include: {
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
        tasks: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
        chat: true,
      },
    });
  }
  async update(projectId, userId, projectData) {
    const { members, tasks, ...updateData } = projectData;
    return await prisma.project.update({
      where: { id: projectId, ownerId: userId },
      data: updateData,
      include: {
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
        tasks: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
  }
  async delete(id) {
    return await prisma.project.delete({
      where: { id: id },
    });
  }
}

export default new ProjectRepository();
