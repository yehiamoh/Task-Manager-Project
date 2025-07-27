import * as nodemailer from "nodemailer";
import projectRepository from "./project.repository.js";
import { projectInvitationTemplate } from "../../utils/emailTemplates.js";
import projectMembersService from "../projectMembers/projectMembers.service.js";
import ApiError from "../../utils/api.error.js";
import userRepository from "../user/user.repository.js";
import { generateToken } from "../../utils/jwt.js";
import projectMembersRepository from "../projectMembers/projectMembers.repository.js";
import { verifyToken } from "../../utils/jwt.js";

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
        await projectMembersRepository.addMember(projectId, userId, "owner");
      return newProject;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to create project", [error.message]);
    }
  }

  async updateProject(projectId, projectData, userId) {
    try {
      if (!projectId) {
        throw new ApiError(400, "Project ID is required");
      }

      if (!projectData || Object.keys(projectData).length === 0) {
        throw new ApiError(400, "Project data is required for update");
      }

      // Check if project exists and user has access
      const existingProject = await projectRepository.get(projectId, userId);
      if (!existingProject) {
        throw new ApiError(
          404,
          "Project not found or you don't have permission to access it"
        );
      }

      // Additional check: only allow owners to update projects
      if (existingProject.ownerId !== userId) {
        throw new ApiError(403, "Only project owners can update projects");
      }

      const updatedProject = await projectRepository.update(
        projectId,
        userId,
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

  async deleteProject(projectId, userId) {
    try {
      if (!projectId) {
        throw new ApiError(400, "Project ID is required");
      }

      // Check if project exists and user is the owner
      const existingProject = await projectRepository.get(projectId, userId);
      if (!existingProject) {
        throw new ApiError(
          404,
          "Project not found or you don't have permission to delete it"
        );
      }

      // Additional check: only allow owners to delete projects
      if (existingProject.ownerId !== userId) {
        throw new ApiError(403, "Only project owners can delete projects");
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
  async sendInvite(projectId, user, ownerId) {
    try {
      const project = await projectRepository.get(projectId, ownerId);
      if (project.ownerId !== ownerId) {
        throw new ApiError(
          403,
          "You are not authorized to send this invitation."
        );
      }
      if (!project) {
        throw new ApiError(
          404,
          "Project not found or you don't have permission to invite users"
        );
      }

      const userId = await userRepository.getUserByEmail(user);
      if (!userId) throw new ApiError(404, "This user Doesn't exists");

      const payload = { userId: userId.id, projectId: project.id };
      const token = generateToken(payload);

      try {
        await this.transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user,
          subject: `Invitation to join "${project.name}" project`,
          html: projectInvitationTemplate(project, token),
        });
      } catch (emailError) {
        throw new ApiError(500, "Failed to send invitation email", [
          emailError.message,
        ]);
      }

      return { message: "Invitation sent successfully" };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, "Failed to send project invitation", [
        error.message,
      ]);
    }
  }
  async acceptInvitation(token, currentUserId) {
    try {
      const decodedToken = verifyToken(token);
      const { userId, projectId } = decodedToken;

      if (userId != currentUserId) {
        throw new ApiError(
          403,
          "You are not authorized to accept this invitation. This invitation was sent to a different user."
        );
      }

      const project = await projectRepository.getById(projectId);
      if (!project) throw new ApiError(404, "This project doesn't exist");

      await projectMembersRepository.addMember(projectId, userId, "member");

      return {
        message: "Successfully joined the project",
        projectId: project.id,
        projectName: project.name,
        role: "member",
      };
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
