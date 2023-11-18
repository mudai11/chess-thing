import { Game } from "./game";

export type User = {
  id: string;
  email: string;
  verified_email: boolean;
  username: string;
  image: string | null;
  password: string | null;
  with_provider: boolean;
  games_as_white: Game[];
  games_as_black: Game[];
  wins: number;
  losses: number;
  draws: number;
  created_at: Date;
};
