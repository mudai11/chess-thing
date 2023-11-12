import { Socket } from "socket.io";
import { leaveLobby, joinLobby, move, gameOver, message } from "./gameplay";

export function injectSocket(socket: Socket) {
  console.log("connected");
  socket.on("join-lobby", joinLobby);
  socket.on("move", move);
  socket.on("leave-lobby", leaveLobby);
  socket.on("game-over", gameOver);
  socket.on("message", message);
}
