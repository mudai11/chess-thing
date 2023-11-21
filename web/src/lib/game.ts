import { Game } from "@/types/game";
import axios from "axios";
import { env } from "@/../env";

export async function getGame(id: string) {
  try {
    const { data } = await axios.get(`${env.SERVER_URL}/api/games/${id}`);
    const game = data as Game;
    return game;
  } catch (e) {
    console.log(e);
    return;
  }
}
