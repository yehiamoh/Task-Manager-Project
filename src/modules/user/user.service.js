import ApiError from "../../utils/api.error.js";
import userRepository from "./user.repository.js";
class UserService {
  async getUserByEmail(email) {
    try {
      const user = await userRepository.getUserByEmail(email);
      if (!user) throw new ApiError(404, "This user isn't exists");
      return user;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, "Failed to retrieve user");
    }
  }
  async getUserProfile(userId) {
    if (!userId) throw new ApiError(400, "Bad Request provide a vaild user id");
    return await userRepository.getUserProfile(userId);
  }
}

export default new UserService();
