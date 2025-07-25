import prisma from "../../config/database.js";

class ProjectRepository {
  async getAll() {
    return await prisma.project.findMany({
      include: {
        tasks: true,
        members: true,
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }
  async get(id) {
    return await prisma.project.findUnique({
      where: { id: id },
      include: {
        tasks: true,
        members: true,
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }
  async create(projectData) {
    const { name, ownerId, members, tasks } = projectData;
    return await prisma.project.create({
      data: { name, ownerId, members, tasks },
      include: {
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
        tasks: true,
        members: true,
      },
    });
  }
  async update(id, projectData) {
    return await prisma.project.update({
      where: { id: id },
      data: { ...projectData },
      include: {
        owner: {
          select: {
            name: true,
            id: true,
          },
        },
        tasks: true,
        members: true,
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
