import projectRepository from "../modules/project/project.repository.js";
import ApiError from "../utils/api.error.js";
export const isProjectOwner = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;
    const project = await projectRepository.getById(projectId);
    if (!project) {
      return next(new ApiError(404, "project not found"));
    }
    if (project.ownerId !== userId) {
      return next(
        new ApiError(403, "You Are not authorized to perform this tasks")
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
