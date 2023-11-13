import { Socket } from "socket.io-client";
import { Action } from "@/store/lobby-store";

export function injectSocket(
  socket: Socket,
  game_id: string,
  curr_user_id: string,
  updateLobby: (action: Action) => void,
  makeMove: Function
) {
  socket.on("connect", () => {
    socket.emit("join-lobby", game_id, curr_user_id);
  });

  socket.on("joined-lobby", (side, user_id) => {
    if (curr_user_id === user_id) {
      updateLobby({ type: "setSide", payload: side });
    }
    if (side === "b") {
      updateLobby({ type: "setBlack", payload: user_id });
      updateLobby({ type: "setBlackConnected", payload: true });
    } else {
      updateLobby({ type: "setWhite", payload: user_id });
      updateLobby({ type: "setWhiteConnected", payload: true });
    }
  });

  socket.on("sync-move", (_, move) => {
    makeMove(move);
  });
}
