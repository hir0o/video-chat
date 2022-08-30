import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join", (roomId) => {
    socket.join(roomId);
  });

  socket.on("message", (message) => {
    socket.broadcast.to("room").emit("message", "hello");
  });

  socket.on("offer", (offer) => {
    socket.broadcast.to(offer.roomId).emit("offer", offer.value);
  });
  socket.on("answer", (answer) => {
    socket.broadcast.to(answer.roomId).emit("answer", answer.value);
  });

  socket.on("candidate", (candidate) => {
    socket.broadcast.to(candidate.roomId).emit("candidate", candidate.value);
  });
});

io.listen(3005);
