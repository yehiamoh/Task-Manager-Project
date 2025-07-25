import * as nodemailer from "nodemailer";
import projectRepository from "./project.repository.js";
import { projectInvitationTemplate } from "../../utils/emailTemplates.js";

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
  async getAllProjects() {
    const projects = await projectRepository.getAll();
    return projects;
  }
  async getProject(id) {
    const project = await projectRepository.get(id);
    return project;
  }
  async createProject(projectData) {
    const newProject = await projectRepository.create(projectData);
    return newProject;
  }
  async updateProject(id, projectData) {
    const updatedProject = await projectRepository.update(id, projectData);
    return updatedProject;
  }
  async deleteProject(id) {
    const deletedProject = await projectRepository.delete(id);
    return deletedProject;
  }
  async inviteToProject(id, users) {
    const project = await projectRepository.get(id);
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: users,
        subject: `Invitation to join "${project.name}" project`, // Subject line
        html: projectInvitationTemplate(project),
      });
    } catch (err) {
      console.error("Error while sending mail", err);
    }
  }
}

export default new ProjectService();
