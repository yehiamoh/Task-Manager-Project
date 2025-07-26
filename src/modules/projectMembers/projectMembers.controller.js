import asyncHandler from "../../utils/asyncHandler.js";
import projectMembersService from "./projectMembers.service.js";

export const getAllMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.userId;
  const members = await projectMembersService.getAllMembers(projectId, userId);

  res.status(201).json({
    success: true,
    message: "Member Successfully retrieved",
    data: members,
  });
});

export const getMember = asyncHandler(async (req, res) => {
  const { memberId } = req.params;
  // const userId = req.user.userId;
  const member = await projectMembersService.getMember(memberId);

  res.status(201).json({
    success: true,
    message: "Member Successfully retrieved",
    data: member,
  });
});

export const addMember = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.userId;
  const newMember = await projectMembersService.addMember(projectId, userId);

  res.status(201).json({
    success: true,
    message: "Member Successfully Added",
    data: newMember,
  });
});

// TODO => Controller to update the member role

export const removeMember = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;
  const userId = req.user.userId;
  await projectMembersService.removeMember(projectId, memberId, userId);

  res.status(204).send();
});
