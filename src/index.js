import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./config/database.js";
import projectRouter from "./modules/project/project.route.js";
import userRouter from "./modules/user/user.route.js";
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

// Api Routes
app.use("/user", userRouter);
app.use("/project", projectRouter);

// Simple connection check
app.get("/", (req, res) => {
  res.json({
    message: "Connected",
    status: "Server is running",
    documentation: "Visit /api-docs for API documentation",
  });
});

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
