import prisma from "../../config/database.js";

class UserRepository {
  async getUserByEmail(email) {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  async getUserById(id) {
    return prisma.user.findFirst({
      where: { id },
    });
  }
  async getUserProfile(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        ownedProjects: {},
      },
      ownedProjects: {
        select: {
          id: true,
          name: true,
          description: true,
          // add other fields as needed
        },
      },
      // projectMembers relation returns the membership records, including the project details
      projectMembers: {
        select: {
          project: {
            select: {
              id: true,
              name: true,
              description: true,
              // add other project fields as needed
            },
          },
        },
      },
    });
  }
}

export default new UserRepository();
