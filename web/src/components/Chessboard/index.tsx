"use client";

import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import useUserStore from "@/store/store";
import io from "socket.io-client";
import { env } from "@/../env";

const socket = io(env.NEXT_PUBLIC_SERVER_URL, {
  autoConnect: false,
});

interface ChessboardComponentProps {
  id: string;
}

export default function ChessboardComponent({ id }: ChessboardComponentProps) {
  const [game, updateGame] = useState(new Chess());
  const user = useUserStore.use.user();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      if (user) socket.emit("join-lobby", id, user.id);
      console.log("connected");
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.id]);

  useEffect(() => {
    socket.on(id, (_, move) => {
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
  }, [game, id]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    const tempGame = new Chess();
    tempGame.loadPgn(game.pgn());
    const valid = tempGame.moves();
    if (!valid.includes(targetSquare)) {
      return false;
    }
    const turn = tempGame.turn();
    const move = tempGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move) {
      socket.emit("move", turn, move, id);
      updateGame(tempGame);
    }
    return true;
  }

  return (
    <div className="w-[560px]">
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
    </div>
  );
}
