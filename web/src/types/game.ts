export type Game = {
  id: string;
  white_player: string | null;
  black_player: string | null;
  winner: string | null;
  end_reason: $Enums.EndReason | null;
  pgn: string;
  date: Date;
};
