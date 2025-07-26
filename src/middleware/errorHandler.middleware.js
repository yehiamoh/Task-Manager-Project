import ApiError from "../utils/api.error.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    errors: [err.message],
    stack: err.stack,
  });
};
