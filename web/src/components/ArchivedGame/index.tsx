"use client";

import { Game } from "@/types/game";
import { FC, useEffect, useReducer, useState } from "react";
import { Chess, Square } from "chess.js";
import { squareReducer } from "../Game/reducers";
import { Chessboard } from "react-chessboard";
import PlayersShowcase from "./PlayersShowcase";
import MoveList from "./MoveList";
import MoveNavigation from "./MoveNavigation";
import CopyLink from "./CopyLink";
import FlipBoard from "./FlipBoard";
import EndStats from "./EndStats";
import { Icons } from "../Icons";

interface ArchivedGameProps {
  game: Game;
}

const ArchivedGame: FC<ArchivedGameProps> = ({ game }) => {
  const [mounted, setMounted] = useState(false);
  const [boardWidth, setBoardWidth] = useState(750);
  const [navFen, setNavFen] = useState<string | null>(null);
  const [navIndex, setNavIndex] = useState<number | null>(null);
  const [flipBoard, setFlipBoard] = useState(false);
  const [showPgn, setShowPgn] = useState(true);
  const currGame = new Chess();
  currGame.loadPgn(game.pgn);

  const [customSquares, updateCustomSquares] = useReducer(squareReducer, {
    options: {},
    lastMove: {},
    rightClicked: {},
    check: {},
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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
    } else if (window.innerWidth >= 600) {
      setBoardWidth(480);
    } else if (window.innerWidth >= 500) {
      setBoardWidth(350);
    } else if (window.innerWidth <= 380) {
      setBoardWidth(300);
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

  function navigateMove(index: number | null | "prev") {
    const history = currGame.history({ verbose: true });

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

    setNavIndex(index);
    setNavFen(history[index].after);
  }

  function getNavMoveSquares() {
    const history = currGame.history({ verbose: true });

    if (!history.length) return;

    let index = navIndex ?? history.length - 1;

    return {
      [history[index].from]: { background: "rgba(255, 255, 0, 0.4)" },
      [history[index].to]: { background: "rgba(255, 255, 0, 0.4)" },
    };
  }

  if (!mounted)
    return (
      <main className="h-80 w-full flex items-center justify-center">
        <div className="flex w-full items-center justify-center gap-4 px-2 py-4 text-white">
          Loading <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        </div>
      </main>
    );

  return (
    <main className="flex w-full flex-wrap justify-center gap-6 px-4 py-10 lg:gap-10 2xl:gap-16">
      <section
        className="relative h-min"
        style={{
          width: boardWidth,
          height: boardWidth,
        }}
      >
        <div className="absolute bottom-0 right-0 top-0 flex h-full w-full items-center justify-cente -z-10">
          <div className="flex w-full items-center justify-center gap-4 px-2 py-4 text-white">
            Loading chessboard...
          </div>
        </div>
        <Chessboard
          customDarkSquareStyle={{ backgroundColor: "#4b7399" }}
          customLightSquareStyle={{ backgroundColor: "#faf9f6" }}
          position={navFen || currGame.fen()}
          boardOrientation={flipBoard ? "black" : "white"}
          isDraggablePiece={() => false}
          onSquareClick={() => updateCustomSquares({ rightClicked: {} })}
          onSquareRightClick={onSquareRightClick}
          customSquareStyles={{
            ...getNavMoveSquares(),
            ...customSquares.rightClicked,
          }}
        />
      </section>

      <section className="flex max-w-lg flex-1 flex-col items-center justify-center gap-4">
        <PlayersShowcase game={game} />
        <CopyLink id={game.id} />
        <FlipBoard flipBoard={flipBoard} setFlipBoard={setFlipBoard} />
        <MoveList
          game={currGame}
          navIndex={navIndex}
          navigateMove={navigateMove}
        />
        <MoveNavigation
          game={currGame}
          navIndex={navIndex}
          navigateMove={navigateMove}
        />
        <EndStats
          game={game}
          currGame={currGame}
          setShowPgn={setShowPgn}
          showPgn={showPgn}
          navFen={navFen}
        />
      </section>
    </main>
  );
};

export default ArchivedGame;
