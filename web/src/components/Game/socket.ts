import { Socket } from "socket.io-client";
import { Action } from "@/store/lobby-store";
import { Game } from "@/types/game";

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

  socket.on(
    "joined-lobby",
    (side, username, players: { white: string; black: string }) => {
      if (curr_username === username) {
        updateLobby({ type: "setSide", payload: side });
      }
      if (side === "b") {
        updateLobby({ type: "setBlackConnected", payload: true });
      } else {
        updateLobby({ type: "setWhiteConnected", payload: true });
      }
      updateLobby({ type: "setBlack", payload: players.black });
      updateLobby({ type: "setWhite", payload: players.white });
    }
  );

  socket.on(
    "sync-move",
    (move: { to: string; from: string; promotion: string }) => {
      makeMove(move);
    }
  );

  socket.on("game-over", (reason: Game["end_reason"]) => {
    updateLobby({ type: "setEndReason", payload: reason });
  });
}
