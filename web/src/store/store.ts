import { createSelectors } from "./createSelectors";
import { create } from "zustand";
import { User, Game } from "@/../../server/src/types";

type userStorState = {
  user: User | null;
};

type userStorAction = {
  setUser: (user: userStorState["user"]) => void;
  clearUser: () => void;
};

const userStore = create<userStorState & userStorAction>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  clearUser: () => set(() => ({ user: null }), true),
}));

export const useUserStore = createSelectors(userStore);

type lobbyStoreState = {
  game: Game | null;
  host: string | null;
  players_number: number | null;
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
  setGame: (game) => set(() => ({ game: game })),
  setHost: (host) => set(() => ({ host: host })),
  setPlayersNumber: (players_number) =>
    set(() => ({ players_number: players_number })),
  clearLobby: () =>
    set(
      () => ({
        game: null,
        host: null,
        white: null,
        black: null,
        players_number: null,
        winner: null,
        end_reason: null,
      }),
      true
    ),
}));

export const useLobbyStore = createSelectors(lobbyStore);
