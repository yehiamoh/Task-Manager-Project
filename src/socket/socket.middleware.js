import { verifyToken } from "../utils/jwt.js";
import userRepository from "../modules/user/user.repository.js";

export const verifySocketAuth = async (socket, next) => {
  try {
    let token = socket.handshake.query?.token;
    if (!token && socket.handshake.auth?.token) {
      token = socket.handshake.auth.token;
    }
    if (!token) {
      const authHeader = socket.handshake.headers?.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return next(new Error("Authentication token is required"));
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return next(new Error("Invalid or expired token"));
    }

    const user = await userRepository.getUserById(decoded.userId);
    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("Socket auth error:", error);
    next(new Error("Authentication failed"));
  }
};
