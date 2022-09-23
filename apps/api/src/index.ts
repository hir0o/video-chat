import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

// @ts-ignore
const app = express();
// @ts-ignore
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

type RoomId = string;
type UserId = string;

const rooms = new Map<RoomId, UserId[]>();

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

      socket.broadcast.to(roomId).emit("call", {
        callerId: socket.id,
      });
    })
    // callしてきた人にofferを送る
    .on(
      "offer",
      (payload: {
        roomId: string;
        targetId: string;
        offer: RTCSessionDescriptionInit;
      }) => {
        io.to(payload.targetId).emit("offer", {
          offer: payload.offer,
          callerId: socket.id,
        });
      }
    )
    // これは個別に送信
    .on("answer", (payload) => {
      io.to(payload.targetId).emit("answer", {
        callerId: socket.id,
        answer: payload.answer,
      });
    })
    // これも個別に送信
    .on("candidate", (payload) => {
      io.to(payload.targetId).emit("candidate", {
        callerId: socket.id,
        value: payload.value,
      });
    })
    .on("getId", () => {
      // console.log("getId", );

      io.to(socket.id).emit("getId", socket.id);
    });

  io.on("connection", (socket) => {
    socket.on("disconnecting", () => {
      const sids = io.of("/").adapter.sids;
      const user = sids.get(socket.id);
      if (user == null) return;
      const [userId, roomId] = Array.from(user);
      if (roomId == null) return;

      rooms.set(
        roomId,
        rooms.get(roomId)!.filter((id) => id !== userId)
      );

      console.log("rooms", rooms);

      socket.broadcast.to(roomId).emit("leave", {
        callerId: userId,
      });
    });
  });
});

app.get("/health", (req, res) => {
  res.send("ok");
});

app.get("/rooms", (req, res) => {
  const roomInfo = Array.from(rooms.keys()).map((roomId) => ({
    roomId,
    users: rooms.get(roomId)!,
  }));

  res.json(roomInfo);
});

io.listen(3005);

app.listen(80, () => {
  console.log("Server is running on port 80");
});
