import prisma from "../../config/database.js";

class UserRepository {
  async getUserByEmail(email) {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}

export default new UserRepository();
