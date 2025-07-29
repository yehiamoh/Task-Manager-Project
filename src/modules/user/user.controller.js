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

export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const userProfile = await userService.getUserProfile(userId);

    res.status(200).json({
      status: "success",
      message: "User Profile Retrieved",
      data: userProfile,
    });
  } catch (error) {
    next(error);
  }
};
