import projectMembersRepository from "../modules/projectMembers/projectMembers.repository.js";
import ApiError from "../utils/api.error.js";

export const isProjectMember = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.user;
    const membership = await projectMembersRepository.getMember(
      projectId,
      userId
    );
    if (!membership) {
      return next(
        new ApiError(
          403,
          "Access denied. You are not a member of this project."
        )
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
