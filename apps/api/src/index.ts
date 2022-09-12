import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map<string, string[]>();

io.on("connection", (socket) => {
  socket
    .on("call", (roomId) => {
      console.log("call", roomId);

      if (roomId == null) return;
      if (rooms.has(roomId)) {
        rooms.set(roomId, [...rooms.get(roomId)!, socket.id]);
      } else {
        rooms.set(roomId, [socket.id]);
      }
      socket.join(roomId);

      console.log("call", rooms);

      socket.broadcast.to(roomId).emit("call");
    })
    .on("offer", (offer) => {
      socket.broadcast.to(offer.roomId).emit("offer", offer.value);
    })
    .on("answer", (answer) => {
      socket.broadcast.to(answer.roomId).emit("answer", answer.value);
    })
    .on("candidate", (candidate) => {
      socket.broadcast.to(candidate.roomId).emit("candidate", candidate.value);
    });
});

app.get("/rooms", (req, res) => {
  const roomInfo = Array.from(rooms.keys()).map((roomId) => ({
    roomId,
    users: rooms.get(roomId)!,
  }));

  res.json(roomInfo);
});

io.listen(3005);

app.listen(3004, () => {
  console.log("Server is running on port 3005");
});
