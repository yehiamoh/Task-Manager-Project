import prisma from "../../config/database.js";

class ProjectMembersRepository {
  async getAll(projectId) {
    return await prisma.projectMember.findMany({
      where: { projectId },
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
    });
  }
  async getMember(projectIdOrMemberId, userId = null) {
    if (userId) {
      return await prisma.projectMember.findUnique({
        where: {
          projectId_userId: {
            projectId: projectIdOrMemberId,
            userId,
          },
        },
      });
    } else {
      return await prisma.projectMember.findUnique({
        where: { id: projectIdOrMemberId },

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
      });
    }
  }
  async addMember(projectId, memberId, role = "member") {
    return await prisma.projectMember.create({
      data: {
        projectId,
        userId: memberId,
        role,
      },
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
    });
  }

  async removeMember(memberId) {
    return await prisma.projectMember.delete({
      where: { id: memberId },
    });
  }
}

export default new ProjectMembersRepository();
