import projectService from "./project.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getProjects = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const projects = await projectService.getAllProjects(userId);
  res.status(200).json({
    success: true,
    data: projects,
  });
});

export const getProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.userId;
  const project = await projectService.getProject(projectId, userId);
  res.status(200).json({
    success: true,
    data: project,
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const projectData = req.body;
  const userId = req.user.userId;
  const project = await projectService.createProject(projectData, userId);
  res.status(201).json({
    success: true,
    data: project,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const projectData = req.body;
  const userId = req.user.userId;
  const project = await projectService.updateProject(
    projectId,
    projectData,
    userId
  );
  res.status(200).json({
    success: true,
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.userId;
  await projectService.deleteProject(projectId, userId);
  res.status(204).send();
});

export const sendInvite = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { user } = req.body;
  const ownerId = req.user.userId;
  const result = await projectService.inviteToProject(projectId, user, ownerId);
  res.status(200).json({
    success: true,
    data: result,
  });
});

export const acceptInvitation = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const currentUserId = req.user.userId;

  const result = await projectService.acceptInvitation(token, currentUserId);
  res.status(200).json({
    success: true,
    data: result,
  });
});
