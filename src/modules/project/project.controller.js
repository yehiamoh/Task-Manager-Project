import projectService from "./project.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import projectMembersService from "../projectMembers/projectMembers.service.js";

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
  const project = await projectService.updateProject(projectId, projectData);
  res.status(200).json({
    success: true,
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  await projectService.deleteProject(projectId);
  res.status(204).send();
});

export const inviteToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { users } = req.body;
  const result = await projectService.inviteToProject(projectId, users);
  res.status(200).json({
    success: true,
    data: result,
  });
});

export const confirmInviteToProject = asyncHandler(async (req, res) => {});
