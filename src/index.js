import express from "express";
import dotenv from "dotenv";
import taskRouter from "./modules/task/task.route.js";
dotenv.config();
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express with ES Modules!");
});
app.use("/api", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
