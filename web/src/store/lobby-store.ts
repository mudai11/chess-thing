import type { Chess as TChess } from "chess.js";
import { Chess } from "chess.js";
import { create } from "zustand";
import { Game } from "../../../server/src/types";

type Lobby = {
  png: string | null;
  black: string | null;
  white: string | null;
  black_connected: boolean;
  white_connected: boolean;
  game: TChess;
  side: string;
  end_reason: Game["end_reason"] | null;
};

type LobbyStoreState = {
  lobby: Lobby;
  count: number;
  abondoned: boolean;
};

export type Action =
  | {
      type: "setPng";
      payload: LobbyStoreState["lobby"]["png"];
    }
  | {
      type: "setBlack";
      payload: LobbyStoreState["lobby"]["black"];
    }
  | {
      type: "setWhite";
      payload: LobbyStoreState["lobby"]["white"];
    }
  | {
      type: "setBlackConnected";
      payload: LobbyStoreState["lobby"]["black_connected"];
    }
  | {
      type: "setWhiteConnected";
      payload: LobbyStoreState["lobby"]["white_connected"];
    }
  | {
      type: "setGame";
      payload: Chess;
    }
  | {
      type: "setSide";
      payload: LobbyStoreState["lobby"]["side"];
    }
  | {
      type: "setEndReason";
      payload: LobbyStoreState["lobby"]["end_reason"];
    }
  | {
      type: "clearLobby";
      payload: null;
    };

const reducer = (state: LobbyStoreState, action: Action) => {
  switch (action.type) {
    case "setPng":
      return { lobby: { ...state.lobby, png: action.payload } };
    case "setBlack":
      return { lobby: { ...state.lobby, black: action.payload } };
    case "setWhite":
      return { lobby: { ...state.lobby, white: action.payload } };
    case "setBlackConnected":
      return { lobby: { ...state.lobby, black_connected: action.payload } };
    case "setWhiteConnected":
      return { lobby: { ...state.lobby, white_connected: action.payload } };
    case "setGame":
      return { lobby: { ...state.lobby, game: action.payload } };
    case "setSide":
      return { lobby: { ...state.lobby, side: action.payload } };
    case "setEndReason":
      return { lobby: { ...state.lobby, end_reason: action.payload } };
    case "clearLobby":
      return {
        lobby: {
          png: null,
          black: null,
          white: null,
          black_connected: false,
          white_connected: false,
          game: new Chess(),
          side: "s",
          count: 60,
          abondoned: false,
          end_reason: null,
        },
      };
  }
};

type lobbyStoreAction = {
  updateLobby: (action: Action) => void;
  start: () => void;
  reset: () => void;
};

let intervalId: any = null;

const clearCurrentInterval = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const useLobbyStore = create<LobbyStoreState & lobbyStoreAction>()((set) => ({
  lobby: {
    png: null,
    black: null,
    white: null,
    black_connected: false,
    white_connected: false,
    game: new Chess(),
    side: "s",
    end_reason: null,
  },
  count: 60,
  abondoned: false,
  updateLobby: (args) => set((state) => reducer(state, args)),
  start: () => {
    if (intervalId === null) {
      let count = 60;
      set({ abondoned: true });

      intervalId = setInterval(() => {
        count = count - 1;
        set((state) => ({ count: state.count - 1 }));
        if (count === 0) {
          clearCurrentInterval();
          set({
            lobby: {
              png: null,
              black: null,
              white: null,
              black_connected: false,
              white_connected: false,
              game: new Chess(),
              side: "s",
              end_reason: null,
            },
            count: 0,
            abondoned: false,
          });
        }
      }, 1000);
    }
  },
  reset: () => {
    clearCurrentInterval();
    set({ count: 0, abondoned: false });
  },
}));

export { useLobbyStore };
