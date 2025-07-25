import prisma from "../../config/database.js";

export const getUserByEmail = async (email) => {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};
