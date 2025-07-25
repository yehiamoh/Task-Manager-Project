import projectService from "./project.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.getAllProjects();
  res.status(200).json({
    success: true,
    data: projects,
  });
});

export const getProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await projectService.getProject(projectId);
  res.status(200).json({
    success: true,
    data: project,
  });
});

export const createProject = asyncHandler(async (req, res) => {
  const projectData = req.body;
  const project = await projectService.createProject(projectData);
  res.status(201).json({
    success: true,
    data: project,
  });
});

export const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const projectData = req.body;
  const project = await projectService.updateProject(projectId, projectData);
  res.status(201).json({
    success: true,
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  await projectService.deleteProject(projectId);
  res.status(204).json();
});

export const inviteToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { users } = req.body;
  const invite = await projectService.inviteToProject(projectId, users);
  res.status(201).json({
    success: true,
    message: "Email sent",
    data: invite,
  });
});
