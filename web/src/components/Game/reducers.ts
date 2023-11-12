import { Lobby, Action, CustomSquares } from "@/types/lobby";

export function lobbyReducer(lobby: Lobby, action: Action): Lobby {
  switch (action.type) {
    case "setPng":
      return { ...lobby, png: action.payload };
    case "setBlack":
      return { ...lobby, black: action.payload };
    case "setWhite":
      return { ...lobby, white: action.payload };
    case "setBlackConnected":
      return { ...lobby, black_connected: action.payload };
    case "setWhiteConnected":
      return { ...lobby, white_connected: action.payload };
    case "setGame":
      return { ...lobby, game: action.payload };
    case "setSide":
      return { ...lobby, side: action.payload };
    case "setEndReason":
      return { ...lobby, end_reason: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

export function squareReducer(
  squares: CustomSquares,
  action: Partial<CustomSquares>
) {
  return { ...squares, ...action };
}
