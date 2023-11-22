import { User } from "@/types/user";
import axios from "axios";
import { env } from "@/../env";
import { Game } from "@/types/game";

export async function getUserHeader(username: string) {
  try {
    const { data } = await axios.get(
      `${env.SERVER_URL}/api/users/user-header/${username}`
    );
    const user = data as Pick<
      User,
      "username" | "image" | "wins" | "losses" | "draws" | "created_at"
    >;

    return user;
  } catch (e) {
    return;
  }
}

export async function getUserGames(username: string) {
  try {
    const { data } = await axios.get(
      `${env.SERVER_URL}/api/users/user-games/${username}`
    );
    const games = data as Game[];

    return games;
  } catch (e) {
    return;
  }
}
