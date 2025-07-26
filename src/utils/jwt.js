import jwt from "jsonwebtoken";
import ApiError from "./api.error.js";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload, expiresIn = "1d") => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    throw new ApiError(500, "Error generating token", [error.message]);
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token");
    }
    throw new ApiError(500, "Error verifying token", [error.message]);
  }
};

export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided");
  }
  return authHeader.split(" ")[1];
};
