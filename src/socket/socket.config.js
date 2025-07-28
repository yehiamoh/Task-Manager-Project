import { Server } from "socket.io";
import { chatEvent } from "../modules/chat/chat.socket.js";
import { verifySocketAuth } from "./socket.middleware.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.use(verifySocketAuth);
  chatEvent(io);

  return io;
};
