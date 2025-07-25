// src/config/database.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Test database connection
async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

// Connect to database when module is imported
connectToDatabase();

// Handle graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
