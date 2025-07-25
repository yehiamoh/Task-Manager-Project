import projectRepository from "./project.repository.js";

const projectService = {
  async getAllProjects() {
    const projects = await projectRepository.getAll();
    return projects;
  },
  async getProject(id) {
    const project = await projectRepository.get(id);
    return project;
  },
  async createProject(projectData) {
    const newProject = await projectRepository.create(projectData);
    return newProject;
  },
  async updateProject(id, projectData) {
    const updatedProject = await projectRepository.update(id, projectData);
    return updatedProject;
  },
  async deleteProject(id) {
    const deletedProject = await projectRepository.delete(id);
    return deletedProject;
  },
};

export default projectService;
