import { Socket } from "socket.io-client";
import { Dispatch } from "react";
import { Action } from "@/types/lobby";

export function injectSocket(
  socket: Socket,
  game_id: string,
  curr_user_id: string,
  updateLobby: Dispatch<Action>,
  makeMove: Function
) {
  socket.on("connect", () => {
    socket.emit("join-lobby", game_id, curr_user_id);
  });

  socket.on("joined-lobby", (side, user_id) => {
    console.log("joined-lobby hit");
    if (curr_user_id === user_id) {
      updateLobby({ type: "setSide", payload: side });
    }
    if (side === "b") {
      updateLobby({ type: "setBlack", payload: user_id });
      updateLobby({ type: "setBlackConnected", payload: true });
      console.log(`user ${curr_user_id} is on black side`);
    } else {
      updateLobby({ type: "setWhite", payload: user_id });
      updateLobby({ type: "setWhiteConnected", payload: true });
      console.log(`user ${curr_user_id} is on white side`);
    }
  });

  socket.on("sync-move", (_, move) => {
    makeMove(move);
  });
}
