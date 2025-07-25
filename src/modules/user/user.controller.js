import prisma from "../../config/database.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, passwordHash } = req.body;
  const newUser = await prisma.user.create({
    data: { name, email, passwordHash },
  });
  res.status(201).json(newUser);
});

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
