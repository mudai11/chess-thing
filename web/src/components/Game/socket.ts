import { Socket } from "socket.io-client";
import { Action } from "@/store/lobby-store";

export function injectSocket(
  socket: Socket,
  game_id: string,
  curr_username: string,
  updateLobby: (action: Action) => void,
  makeMove: Function
) {
  socket.on("connect", () => {
    socket.emit("join-lobby", game_id, curr_username);
  });

  socket.on("joined-lobby", (side, username) => {
    if (curr_username === username) {
      updateLobby({ type: "setSide", payload: side });
    }
    if (side === "b") {
      updateLobby({ type: "setBlack", payload: username });
      updateLobby({ type: "setBlackConnected", payload: true });
    } else {
      updateLobby({ type: "setWhite", payload: username });
      updateLobby({ type: "setWhiteConnected", payload: true });
    }
  });

  socket.on("sync-move", (_, move) => {
    makeMove(move);
  });
}
