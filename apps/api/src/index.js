"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var cors_1 = require("cors");
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
var rooms = new Map();
io.on("connection", function (socket) {
    socket
        .on("call", function (roomId) {
        console.log("call", roomId);
        if (roomId == null)
            return;
        if (rooms.has(roomId)) {
            rooms.set(roomId, __spreadArray(__spreadArray([], rooms.get(roomId), true), [socket.id], false));
        }
        else {
            rooms.set(roomId, [socket.id]);
        }
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("call", {
            callerId: socket.id
        });
    })
        // callしてきた人にofferを送る
        .on("offer", function (payload) {
        io.to(payload.targetId).emit("offer", {
            offer: payload.offer,
            callerId: socket.id
        });
    })
        // これは個別に送信
        .on("answer", function (payload) {
        io.to(payload.targetId).emit("answer", {
            callerId: socket.id,
            answer: payload.answer
        });
    })
        // これも個別に送信
        .on("candidate", function (payload) {
        io.to(payload.targetId).emit("candidate", {
            callerId: socket.id,
            value: payload.value
        });
    })
        .on("getId", function () {
        // console.log("getId", );
        io.to(socket.id).emit("getId", socket.id);
    });
    io.on("connection", function (socket) {
        socket.on("disconnecting", function () {
            var sids = io.of("/").adapter.sids;
            var user = sids.get(socket.id);
            if (user == null)
                return;
            var _a = Array.from(user), userId = _a[0], roomId = _a[1];
            if (roomId == null)
                return;
            rooms.set(roomId, rooms.get(roomId).filter(function (id) { return id !== userId; }));
            console.log("rooms", rooms);
            socket.broadcast.to(roomId).emit("leave", {
                callerId: userId
            });
        });
    });
});
app.get("/rooms", function (req, res) {
    var roomInfo = Array.from(rooms.keys()).map(function (roomId) { return ({
        roomId: roomId,
        users: rooms.get(roomId)
    }); });
    res.json(roomInfo);
});
io.listen(3005);
app.listen(3004, function () {
    console.log("Server is running on port 3005");
});
