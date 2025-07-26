import prisma from "../../config/database.js";

class ProjectRepository {
  async getAll(userId) {
    return await prisma.project.findMany({
      where: { ownerId: userId },
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
  async get(projectId, userId) {
    return await prisma.project.findUnique({
      where: { id: projectId, ownerId: userId },
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
  async create(projectData, userId) {
    const { name, description, members = [], tasks = [] } = projectData;
    return await prisma.project.create({
      data: {
        name,
        ownerId: userId,
        description,
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
