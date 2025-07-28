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
}

export default new UserRepository();
