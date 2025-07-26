import express from "express";
import dotenv from "dotenv";
import taskRouter from "./modules/task/task.route.js";
dotenv.config();
import "./config/database.js";
import projectRouter from "./modules/project/project.route.js";
import projectMembersRouter from "./modules/projectMembers/projectMembers.route.js";
import userRouter from "./modules/user/user.route.js";
import authRouter from "./modules/auth/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

// Api Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", projectRouter);
app.use("/api", projectMembersRouter);
app.use("/api", taskRouter);
// Simple connection check
app.get("/", (req, res) => {
  res.json({
    message: "Connected",
    status: "Server is running",
    documentation: "Visit /api-docs for API documentation",
  });
});
app.use(errorHandler);
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
