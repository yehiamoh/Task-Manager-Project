import prisma from "../../config/database.js";

export const RegisterRepository = async (userData) => {
  return await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      passwordHash: userData.passwordHash,
      profileImage: userData.profileImage,
    },
  });
};
