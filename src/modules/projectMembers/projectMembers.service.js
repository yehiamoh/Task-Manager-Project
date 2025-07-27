import ApiError from "../../utils/api.error.js";
import projectMembersRepository from "./projectMembers.repository.js";

class ProjectMembersService {
  async getAllMembers(projectId, userId) {
    try {
      const isMember = await projectMembersRepository.getMember(
        projectId,
        userId
      );
      if (!isMember) throw new ApiError(404, "You are not a member");
      const members = await projectMembersRepository.getAll(projectId);
      if (!members) throw new ApiError(404, "There's no members");
      return members;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, "Failed to get members", [error.message]);
    }
  }
  async getMember(memberId) {
    try {
      const existingMember = await projectMembersRepository.getMember(memberId);
      if (!existingMember) throw new ApiError(404, "Member doesn't exists");
      return existingMember;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, "Failed to get member", [error.message]);
    }
  }

  async removeMember(projectId, memberId, userId) {
    try {
      const isOwner = await projectMembersRepository.getMember(
        projectId,
        userId
      );
      if (isOwner.role != "owner")
        throw new ApiError(404, "Member is not owner");
      const isMember = await projectMembersRepository.getMember(memberId);
      if (!isMember) throw new ApiError(404, "Member doesn't exists");
      await projectMembersRepository.removeMember(memberId);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, "Failed to delete member", [error.message]);
    }
  }
}

export default new ProjectMembersService();
