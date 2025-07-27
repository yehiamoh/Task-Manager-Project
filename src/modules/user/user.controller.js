import prisma from "../../config/database.js";
import asyncHandler from "../../utils/asyncHandler.js";
import userService from "./user.service.js";
export const getAllUsers = asyncHandler(async (req, res) => {
  const getUsers = await prisma.user.findMany({
    include: {
      ownedProjects: true,
      projectMembers: true,
    },
  });
  res.status(200).json({
    success: true,
    data: getUsers,
  });
});

export const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);
  res.status(200).json({
    success: true,
    data: user,
  });
});
