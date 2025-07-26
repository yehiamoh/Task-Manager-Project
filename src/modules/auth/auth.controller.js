import { RegisterService, LoginService } from "./auth.service.js";

export const Register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    console.log(email, name, password);
    const { token, user } = await RegisterService(name, password, email);

    res.status(201).json({
      status: "success",
      message: "User Created Successfully",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await LoginService(email, password);

    res.status(200).json({
      status: "success",
      message: "User Logged In Successfully",
      data: user,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
