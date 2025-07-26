import jwt from "jsonwebtoken";
import ApiError from "../utils/api.error.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyLogin = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;
  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(403, "Invalid or expired token", [error.message]);
  }
});
