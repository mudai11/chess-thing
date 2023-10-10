import { Socket } from "socket.io";

export function injectSocket(socket: Socket) {
  console.log("connected");
  socket.on("join-lobby", () => {
    console.log("joined lobby");
  });
}
