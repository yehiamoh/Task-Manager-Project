import ApiError from "../../utils/api.error.js";
import { RegisterRepository } from "./auth.repository.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";
import { getUserByEmail } from "../user/user.repository.js";
export const RegisterService = async (name, password, email) => {
  if (!name || !password || !email) {
    throw new ApiError(
      400,
      "Bad Request: name, password and email are required"
    );
  }

  try {
    const IsUserExist = await getUserByEmail(email);

    if (IsUserExist) {
      throw new ApiError(403, "User Already Exists");
    }

    const hashedPassword = await hashPassword(password);

    const userData = {
      name,
      email,
      passwordHash: hashedPassword,
      profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    const user = await RegisterRepository(userData);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    };

    const token = await generateToken({ userId: user.id });

    return { token, user: safeUser };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Error Registering user", [error.message]);
  }
};

export const LoginService = async (email, password) => {
  if (!email || !password) {
    throw new ApiError(400, "Bad Request: provide a proper email and password");
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    };

    const token = await generateToken({ userId: user.id });
    return { token, user: safeUser };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "Error in Login", [error.message]);
  }
};
