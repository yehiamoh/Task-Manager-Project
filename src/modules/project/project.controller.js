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
  const { id } = req.params;
  const project = await projectService.getProject(id);
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
  const { id } = req.params;
  const projectData = req.body;
  const project = await projectService.updateProject(id, projectData);
  res.status(201).json({
    success: true,
    data: project,
  });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await projectService.deleteProject(id);
  res.status(204).json({
    message: "Project deleted",
    data: project,
  });
});
