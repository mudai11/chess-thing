"use client";

import { Chessboard, ClearPremoves } from "react-chessboard";
import { useState, useEffect, FC, useReducer, useRef } from "react";
import { useUserStore } from "@/store/user-store";
import { useLobbyStore } from "@/store/lobby-store";
import { SocketService } from "@/utils/socket";
import { squareReducer } from "./reducers";
import type { Move, Square } from "chess.js";
import { injectSocket } from "./socket";
import MoveList from "./MoveList";
import MoveNavigation from "./MoveNavigation";
import PlayersShowcase from "./PlayersShowcase";
import Chat from "./Chat";
import Overlay from "./Overlay";
import CopyLink from "./CopyLink";
import ChatLoading from "./Chat/ChatLoading";
import GameLoading from "./GameLoading";

const socket_service = SocketService.getInstance();
const socket = socket_service.getSocket();

interface GameProps {
  id: string;
}

const Game: FC<GameProps> = ({ id }) => {
  const user = useUserStore((state) => state.user);
  const lobby = useLobbyStore((state) => state.lobby);
  const updateLobby = useLobbyStore((state) => state.updateLobby);
  const [customSquares, updateCustomSquares] = useReducer(squareReducer, {
    options: {},
    lastMove: {},
    rightClicked: {},
    check: {},
  });
  const [moveFrom, setMoveFrom] = useState<string | Square | null>(null);
  const [navFen, setNavFen] = useState<string | null>(null);
  const [navIndex, setNavIndex] = useState<number | null>(null);
  const [boardWidth, setBoardWidth] = useState(750);
  const initialized = useRef(false);
  const chessboardRef = useRef<ClearPremoves>(null);

  useEffect(() => {
    if (!user) return;
    socket.connect();
    injectSocket(socket, id, user.username, updateLobby, makeMove);

    return () => {
      if (process.env.NODE_ENV === "development") {
        if (initialized.current) {
          if (user) socket.emit("leave-lobby", id, user.username);
          socket.removeAllListeners();
          socket.disconnect();
          updateLobby({ type: "clearLobby", payload: null });
        }
        initialized.current = true;
      }
      if (process.env.NODE_ENV === "production") {
        if (user) socket.emit("leave-lobby", id, user.username);
        socket.removeAllListeners();
        socket.disconnect();
        updateLobby({ type: "clearLobby", payload: null });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, updateLobby, user]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleResize() {
    if (window.innerWidth >= 1200) {
      setBoardWidth(750);
    } else if (window.innerWidth >= 800) {
      setBoardWidth(580);
    } else if (window.innerWidth >= 580) {
      setBoardWidth(480);
    } else if (window.innerWidth >= 500) {
      setBoardWidth(350);
    } else if (window.innerWidth <= 380) {
      setBoardWidth(300);
    }
  }

  function makeMove(m: { from: string; to: string; promotion?: string }) {
    try {
      const result = lobby.game.move(m);
      if (!result) return;

      setNavFen(null);
      setNavIndex(null);

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

  function navigateMove(index: number | null | "prev") {
    const history = lobby.game.history({ verbose: true });

    if (
      index === null ||
      (index !== "prev" && index >= history.length - 1) ||
      !history.length
    ) {
      setNavIndex(null);
      setNavFen(null);
      return;
    }

    if (index === "prev") {
      index = history.length - 2;
    } else if (index < 0) {
      index = 0;
    }

    chessboardRef.current?.clearPremoves(false);

    setNavIndex(index);
    setNavFen(history[index].after);
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

  function resetFirstMove(square: Square) {
    setMoveFrom(square);
    getMoveOptions(square);
  }

  function onSquareClick(square: Square) {
    updateCustomSquares({ rightClicked: {} });
    if (!user || lobby.side !== lobby.game.turn() || navFen || lobby.end_reason)
      return;

    const turn = lobby.game.turn();

    if (moveFrom === null) {
      resetFirstMove(square);
      return;
    }

    const moveDetails = {
      from: moveFrom,
      to: square,
      promotion: "q",
    };

    const move = makeMove(moveDetails);
    if (!move) {
      resetFirstMove(square);
    } else {
      setMoveFrom(null);
      socket.emit("move", turn, moveDetails, id, user.username);
    }
  }

  function onSquareRightClick(square: Square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    updateCustomSquares({
      rightClicked: {
        ...customSquares.rightClicked,
        [square]:
          customSquares.rightClicked[square] &&
          customSquares.rightClicked[square]?.backgroundColor === colour
            ? undefined
            : { backgroundColor: colour },
      },
    });
  }

  if (lobby.side === "s")
    return <GameLoading boardWidth={boardWidth} id={id} />;

  return (
    <main className="flex w-full flex-wrap justify-center gap-6 px-4 py-10 lg:gap-10 2xl:gap-16">
      <section className="relative h-min">
        <Overlay />
        <Chessboard
          id="playing-board"
          ref={chessboardRef}
          customDarkSquareStyle={{ backgroundColor: "#4b7399" }}
          customLightSquareStyle={{ backgroundColor: "#faf9f6" }}
          position={navFen || lobby.game.fen()}
          boardOrientation={lobby.side === "b" ? "black" : "white"}
          onPieceDragBegin={onPieceDragBegin}
          onPieceDragEnd={onPieceDragEnd}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          arePremovesAllowed={!navFen}
          customSquareStyles={{
            ...(navIndex === null
              ? customSquares.lastMove
              : getNavMoveSquares()),
            ...(navIndex === null ? customSquares.check : {}),
            ...customSquares.rightClicked,
            ...(navIndex === null ? customSquares.options : {}),
          }}
          boardWidth={boardWidth}
        />
      </section>
      <section className="flex max-w-lg min-w-[300px] flex-1 flex-col items-center justify-center gap-4">
        <PlayersShowcase />
        <CopyLink id={id} />
        <MoveList navIndex={navIndex} navigateMove={navigateMove} />
        <MoveNavigation navIndex={navIndex} navigateMove={navigateMove} />
        <Chat id={id} socket={socket} />
      </section>
    </main>
  );
};

export default Game;
