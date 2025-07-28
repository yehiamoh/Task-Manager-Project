import jwt from "jsonwebtoken";
import ApiError from "../utils/api.error.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken, extractTokenFromHeader } from "../utils/jwt.js";
export const verifyLogin = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = extractTokenFromHeader(authHeader);
  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(403, "Invalid or expired token", [error.message]);
  }
});
