import type { Chess } from "chess.js";
import { createSelectors } from "./createSelectors";
import { create } from "zustand";
import { Game } from "../../../server/src/types";

type lobbyStoreState = {
  png: string | null;
  black: string | null;
  white: string | null;
  black_connected: boolean | null;
  white_connected: boolean | null;
  players_number: number | null;
  actualGame: Chess | null;
  side: "b" | "w" | "s";
  end_reasons: Game["end_reason"] | null;
};

type lobbyStoreAction = {
  setPng: (png: lobbyStoreState["png"]) => void;
  setBlack: (black: lobbyStoreState["black"]) => void;
  setWhite: (white: lobbyStoreState["white"]) => void;
  setBlackConnected: (
    black_connected: lobbyStoreState["black_connected"]
  ) => void;
  setWhiteConnected: (
    white_connected: lobbyStoreState["white_connected"]
  ) => void;
  setPlayersNumber: (players_number: lobbyStoreState["players_number"]) => void;
  setActualGame: (actualGame: lobbyStoreState["actualGame"]) => void;
  clearLobby: () => void;
};

const lobbyStore = create<lobbyStoreState & lobbyStoreAction>()((set) => ({
  png: null,
  black: null,
  white: null,
  black_connected: null,
  white_connected: null,
  players_number: null,
  actualGame: null,
  side: "s",
  end_reasons: null,
  setPng: (png) => set(() => ({ png: png })),
  setBlack: (black) => set(() => ({ black: black })),
  setWhite: (white) => set(() => ({ white: white })),
  setBlackConnected: (black_connected) =>
    set(() => ({ black_connected: black_connected })),
  setWhiteConnected: (white_connected) =>
    set(() => ({ white_connected: white_connected })),
  setPlayersNumber: (players_number) =>
    set(() => ({ players_number: players_number })),
  setActualGame: (actualGame) => set(() => ({ actualGame: actualGame })),
  clearLobby: () =>
    set(
      () => ({
        png: null,
        black: null,
        white: null,
        black_connected: null,
        white_connected: null,
        players_number: null,
        actualGame: null,
        side: "s",
        end_reasons: null,
      }),
      true
    ),
}));

export default createSelectors(lobbyStore);
