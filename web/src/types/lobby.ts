import type { Chess } from "chess.js";
import { Game } from "../../../server/src/types";

export type Lobby = {
  png: string | null;
  black: string | null;
  white: string | null;
  black_connected: boolean | null;
  white_connected: boolean | null;
  game: Chess | null;
  side: "b" | "w" | "s";
  end_reason: Game["end_reason"] | null;
};

export type CustomSquares = {
  options: { [square: string]: { background: string; borderRadius?: string } };
  lastMove: { [square: string]: { background: string } };
  rightClicked: { [square: string]: { backgroundColor: string } | undefined };
  check: { [square: string]: { background: string; borderRadius?: string } };
};

export type Action =
  | {
      type: "setPng";
      payload: Lobby["png"];
    }
  | {
      type: "setBlack";
      payload: Lobby["black"];
    }
  | {
      type: "setWhite";
      payload: Lobby["white"];
    }
  | {
      type: "setBlackConnected";
      payload: Lobby["black_connected"];
    }
  | {
      type: "setWhiteConnected";
      payload: Lobby["white_connected"];
    }
  | {
      type: "setGame";
      payload: Chess;
    }
  | {
      type: "setSide";
      payload: Lobby["side"];
    }
  | {
      type: "setEndReason";
      payload: Lobby["end_reason"];
    };
