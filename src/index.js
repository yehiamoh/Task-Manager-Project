import express from "express";
import dotenv from "dotenv";
import { createServer } from "node:http";
import taskRouter from "./modules/task/task.route.js";
dotenv.config();
import "./config/database.js";
import { initializeSocket } from "./socket/socket.config.js";
import projectRouter from "./modules/project/project.route.js";
import projectMembersRouter from "./modules/projectMembers/projectMembers.route.js";
import userRouter from "./modules/user/user.route.js";
import authRouter from "./modules/auth/auth.route.js";
import chatRouter from "./modules/chat/chat.route.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import commentRouter from "./modules/comment/comment.router.js";
import { specs, swaggerUi } from "./docs/swagger.js";
const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);

app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Task Manager API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true
  }
}));

// Api Routes
app.use("/api", authRouter);
app.use("/api", chatRouter);
app.use("/api", userRouter);
app.use("/api", projectRouter);
app.use("/api", projectMembersRouter);
app.use("/api", taskRouter);
app.use("/api", commentRouter);
// Simple connection check
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Task Manager API",
    status: "Server is running",
    version: "1.0.0",
    documentation: {
      swagger: "Visit /api-docs for interactive API documentation",
      endpoints: "All API endpoints are prefixed with /api"
    },
    features: [
      "User authentication and authorization",
      "Project management with team collaboration",
      "Task creation, assignment, and tracking",
      "Real-time chat functionality",
      "Comment system for tasks",
      "Project member management"
    ]
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

const io = initializeSocket(server);

export { app, io };

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
