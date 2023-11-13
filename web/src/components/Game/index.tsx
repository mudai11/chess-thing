"use client";

import { Chessboard } from "react-chessboard";
import { useState, useEffect, FC, useReducer } from "react";
import { useUserStore } from "@/store/user-store";
import { useLobbyStore } from "@/store/lobby-store";
import { SocketService } from "@/utils/socket";
import { squareReducer } from "./reducers";
import type { Move, Square } from "chess.js";
import { injectSocket } from "./socket";

const socket_service = SocketService.getInstance();
const socket = socket_service.getSocket();

interface ChessboardComponentProps {
  id: string;
}

const ChessboardComponent: FC<ChessboardComponentProps> = ({ id }) => {
  const user = useUserStore((state) => state.user);
  const lobby = useLobbyStore((state) => state.lobby);
  const updateLobby = useLobbyStore((state) => state.updateLobby);
  // const start = useLobbyStore((state) => state.start);
  // const reset = useLobbyStore((state) => state.reset);
  const [customSquares, updateCustomSquares] = useReducer(squareReducer, {
    options: {},
    lastMove: {},
    rightClicked: {},
    check: {},
  });
  const [navFen, setNavFen] = useState<string | null>(null);
  const [navIndex, setNavIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    socket.connect();
    injectSocket(socket, id, user.username, updateLobby, makeMove);

    return () => {
      if (user) socket.emit("leave-lobby", id, user.username);
      socket.removeAllListeners();
      socket.disconnect();
      updateLobby({ type: "clearLobby", payload: null });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  function makeMove(m: { from: string; to: string; promotion?: string }) {
    try {
      const result = lobby.game.move(m);
      if (!result) return;

      setNavFen(null);
      setNavIndex(null);
      updateLobby({
        type: "setPng",
        payload: lobby.game.pgn(),
      });
      let kingSquare = undefined;
      if (lobby.game.inCheck()) {
        const kingPos = lobby.game.board().reduce((acc, row, index) => {
          const squareIndex = row.findIndex(
            (square) =>
              square &&
              square.type === "k" &&
              square.color === lobby.game.turn()
          );
          return squareIndex >= 0
            ? `${String.fromCharCode(squareIndex + 97)}${8 - index}`
            : acc;
        }, "");
        kingSquare = {
          [kingPos]: {
            background:
              "radial-gradient(red, rgba(255,0,0,.4), transparent 70%)",
            borderRadius: "50%",
          },
        };
      }
      updateCustomSquares({
        lastMove: {
          [result.from]: { background: "rgba(255, 255, 0, 0.4)" },
          [result.to]: { background: "rgba(255, 255, 0, 0.4)" },
        },
        options: {},
        check: kingSquare,
      });
      return true;
    } catch (err) {
      updateCustomSquares({
        options: {},
      });
      return false;
    }
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    if (!user || lobby.side === "s" || navFen || lobby.end_reason) return false;

    const moveDetails = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    };

    const turn = lobby.game.turn();
    if (lobby.side != turn) return false;

    const move = makeMove(moveDetails);
    if (!move) return false;
    socket.emit("move", turn, moveDetails, id, user.username);
    return true;
  }

  function getNavMoveSquares() {
    if (navIndex === null) return;
    const history = lobby.game.history({ verbose: true });

    if (!history.length) return;

    return {
      [history[navIndex].from]: { background: "rgba(255, 255, 0, 0.4)" },
      [history[navIndex].to]: { background: "rgba(255, 255, 0, 0.4)" },
    };
  }

  function getMoveOptions(square: Square) {
    const moves = lobby.game.moves({
      square,
      verbose: true,
    }) as Move[];
    if (moves.length === 0) {
      return;
    }

    const newSquares: {
      [square: string]: { background: string; borderRadius?: string };
    } = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          lobby.game.get(move.to as Square) &&
          lobby.game.get(move.to as Square)?.color !==
            lobby.game.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    updateCustomSquares({ options: newSquares });
  }

  function onPieceDragBegin(_: string, sourceSquare: Square) {
    if (lobby.side !== lobby.game.turn() || navFen || lobby.end_reason) return;

    getMoveOptions(sourceSquare);
  }

  function onPieceDragEnd() {
    updateCustomSquares({ options: {} });
  }

  if (lobby.side === "s") return <div>loading...</div>;

  return (
    <div className="w-[560px]">
      <Chessboard
        customDarkSquareStyle={{ backgroundColor: "#4b7399" }}
        customLightSquareStyle={{ backgroundColor: "#faf9f6" }}
        position={navFen || lobby.game.fen()}
        boardOrientation={lobby.side === "b" ? "black" : "white"}
        onPieceDragBegin={onPieceDragBegin}
        onPieceDragEnd={onPieceDragEnd}
        onPieceDrop={onDrop}
        arePremovesAllowed={!navFen}
        customSquareStyles={{
          ...(navIndex === null ? customSquares.lastMove : getNavMoveSquares()),
          ...(navIndex === null ? customSquares.check : {}),
          ...customSquares.rightClicked,
          ...(navIndex === null ? customSquares.options : {}),
        }}
      />
    </div>
  );
};

export default ChessboardComponent;
