import { Game } from "@/../../server/src/types";
import type { Chess } from "chess.js";
import { createSelectors } from "./createSelectors";
import { create } from "zustand";

type lobbyStoreState = {
  game: Game | null;
  host: string | null;
  players_number: number | null;
  actualGame: Chess | null;
  side: "b" | "w" | "s";
};

type lobbyStoreAction = {
  setGame: (game: lobbyStoreState["game"]) => void;
  setHost: (host: lobbyStoreState["host"]) => void;
  setPlayersNumber: (players_number: lobbyStoreState["players_number"]) => void;
  clearLobby: () => void;
};

const lobbyStore = create<lobbyStoreState & lobbyStoreAction>()((set) => ({
  game: null,
  host: null,
  players_number: null,
  actualGame: null,
  side: "s",
  setGame: (game) => set(() => ({ game: game })),
  setHost: (host) => set(() => ({ host: host })),
  setPlayersNumber: (players_number) =>
    set(() => ({ players_number: players_number })),
  clearLobby: () =>
    set(
      () => ({
        game: null,
        host: null,
        players_number: null,
        actualGame: null,
        side: "s",
      }),
      true
    ),
}));

export default createSelectors(lobbyStore);
