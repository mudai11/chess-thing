"use client";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useState, useEffect, FC } from "react";
import useUserStore from "@/store/user-store";
import { SocketService } from "@/utils/socket";

const socket_service = SocketService.getInstance();
const socket = socket_service.getSocket();

interface ChessboardComponentProps {
  id: string;
}

const ChessboardComponent: FC<ChessboardComponentProps> = ({ id }) => {
  const [game, updateGame] = useState(new Chess());
  const user = useUserStore.use.user();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      if (user) socket.emit("join-lobby", id, user.id);
    });

    return () => {
      if (user) socket.emit("leave-lobby", id, user.id);
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [id, user]);

  useEffect(() => {
    socket.on("sync-move", (_, move) => {
      const tempGame = new Chess();
      tempGame.loadPgn(game.pgn());
      const valid = tempGame.moves();
      if (!valid.includes(move.to)) {
        return false;
      }
      const new_move = tempGame.move(move);

      if (new_move) {
        updateGame(tempGame);
      }
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [game]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    const tempGame = new Chess();
    tempGame.loadPgn(game.pgn());
    const valid = tempGame.moves();
    if (!valid.includes(targetSquare) || !user) return false;
    const turn = tempGame.turn();
    const move = tempGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (!move) return false;
    socket.emit("move", turn, move, id, user.id);
    updateGame(tempGame);
    return true;
  }

  return (
    <div className="w-[560px]">
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
};

export default ChessboardComponent;
