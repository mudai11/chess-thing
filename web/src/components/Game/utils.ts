import type { Game, User } from "../../../../server/src/types";
import type { Dispatch, SetStateAction } from "react";
import type { Chess } from "chess.js";

type Lobby = Game & {
  players_number: number;
  host: string;
  actualGame: Chess;
  side: "b" | "w" | "s";
};

interface CustomSquares {
  options: { [square: string]: { background: string; borderRadius?: string } };
  lastMove: { [square: string]: { background: string } };
  rightClicked: { [square: string]: { backgroundColor: string } | undefined };
  check: { [square: string]: { background: string; borderRadius?: string } };
}

type Action =
  | {
      type: "updateLobby";
      payload: Partial<Lobby>;
    }
  | {
      type: "setSide";
      payload: Lobby["side"];
    }
  | {
      type: "setGame";
      payload: Chess;
    };

export const syncPgn = (
  latestPgn: string,
  lobby: Lobby,
  actions: {
    updateCustomSquares: Dispatch<Partial<CustomSquares>>;
    setNavFen: Dispatch<SetStateAction<string | null>>;
    setNavIndex: Dispatch<SetStateAction<number | null>>;
  }
) => {
  actions.setNavFen(null);
  actions.setNavIndex(null);
  lobby.actualGame.loadPgn(latestPgn as string);

  const lastMove = lobby.actualGame.history({ verbose: true }).pop();

  let lastMoveSquares = undefined;
  let kingSquare = undefined;
  if (lastMove) {
    lastMoveSquares = {
      [lastMove.from]: { background: "rgba(255, 255, 0, 0.4)" },
      [lastMove.to]: { background: "rgba(255, 255, 0, 0.4)" },
    };
  }
  if (lobby.actualGame.inCheck()) {
    const kingPos = lobby.actualGame.board().reduce((acc, row, index) => {
      const squareIndex = row.findIndex(
        (square) =>
          square &&
          square.type === "k" &&
          square.color === lobby.actualGame.turn()
      );
      return squareIndex >= 0
        ? `${String.fromCharCode(squareIndex + 97)}${8 - index}`
        : acc;
    }, "");
    kingSquare = {
      [kingPos]: {
        background: "radial-gradient(red, rgba(255,0,0,.4), transparent 70%)",
        borderRadius: "50%",
      },
    };
  }
  actions.updateCustomSquares({
    lastMove: lastMoveSquares,
    check: kingSquare,
  });
};

export const syncSide = (
  user: User,
  game: Game | undefined,
  lobby: Lobby,
  actions: { updateLobby: Dispatch<Action> }
) => {
  if (!game) game = lobby;
  if (game.blackId === user?.id) {
    if (lobby.side !== "b")
      actions.updateLobby({ type: "setSide", payload: "b" });
  } else if (game.whiteId === user?.id) {
    if (lobby.side !== "w")
      actions.updateLobby({ type: "setSide", payload: "w" });
  } else if (lobby.side !== "s") {
    actions.updateLobby({ type: "setSide", payload: "s" });
  }
};
