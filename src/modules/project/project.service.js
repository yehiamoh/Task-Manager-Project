import * as nodemailer from "nodemailer";
import projectRepository from "./project.repository.js";
import { projectInvitationTemplate } from "../../utils/emailTemplates.js";
import projectMembersService from "../projectMembers/projectMembers.service.js";
import ApiError from "../../utils/api.error.js";

class ProjectService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async getAllProjects(userId) {
    try {
      const projects = await projectRepository.getAll(userId);
      return projects;
    } catch (error) {
      throw new ApiError(500, "Failed to retrieve projects", [error.message]);
    }
  }

  async getProject(projectId, userId) {
    try {
      if (!projectId) {
        throw new ApiError(400, "Project ID is required");
      }

      const project = await projectRepository.get(projectId, userId);

      if (!project) {
        throw new ApiError(404, "Project not found");
      }

      return project;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to retrieve project", [error.message]);
    }
  }

  async createProject(projectData, userId) {
    try {
      if (!projectData || !projectData.name) {
        throw new ApiError(400, "Project name is required");
      }

      const newProject = await projectRepository.create(projectData, userId);
      if (newProject && newProject.id)
        await projectMembersService.addMember(newProject.id, userId, "owner");
      return newProject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to create project", [error.message]);
    }
  }

  async updateProject(projectId, projectData) {
    try {
      if (!projectId) {
        throw new ApiError(400, "Project ID is required");
      }

      if (!projectData || Object.keys(projectData).length === 0) {
        throw new ApiError(400, "Project data is required for update");
      }

      // Check if project exists
      const existingProject = await projectRepository.get(projectId);
      if (!existingProject) {
        throw new ApiError(404, "Project not found");
      }

      const updatedProject = await projectRepository.update(
        projectId,
        projectData
      );
      return updatedProject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to update project", [error.message]);
    }
  }

  async deleteProject(projectId) {
    try {
      if (!projectId) {
        throw new ApiError(400, "Project ID is required");
      }

      // Check if project exists
      const existingProject = await projectRepository.get(projectId);
      if (!existingProject) {
        throw new ApiError(404, "Project not found");
      }

      const deletedProject = await projectRepository.delete(projectId);
      return deletedProject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to delete project", [error.message]);
    }
  }
  async inviteToProject(projectId, users) {
    try {
      if (!projectId) {
        throw new ApiError(400, "Project ID is required");
      }

      if (!users || !Array.isArray(users) || users.length === 0) {
        throw new ApiError(400, "Valid users array is required for invitation");
      }

      const project = await projectRepository.get(projectId);
      if (!project) {
        throw new ApiError(404, "Project not found");
      }

      try {
        await this.transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: users,
          subject: `Invitation to join "${project.name}" project`,
          html: projectInvitationTemplate(project),
        });
      } catch (emailError) {
        throw new ApiError(500, "Failed to send invitation email", [
          emailError.message,
        ]);
      }

      return { message: "Invitations sent successfully" };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to send project invitation", [
        error.message,
      ]);
    }
  }
}

export default new ProjectService();
