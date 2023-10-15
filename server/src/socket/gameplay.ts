import { Game } from "@prisma/client";
import { Socket } from "socket.io";
import { publisher } from "../main";

type TCachedGame = Game & { players: number; host: string };

export async function joinLobby(
  this: Socket,
  game_id: string,
  user_id: string
) {
  console.log(user_id, "is trying to join lobby", game_id);
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  const host = game.host;
  if (host === user_id) {
    this.join(game_id);
    console.log(user_id, "joined lobby", game_id, "as a host");
    return;
  }
  const player_count = game.players;
  if (player_count === 2) {
    this.join(game_id);
    console.log(user_id, "joined lobby", game_id, "as spectator");
    return;
  }
  this.join(game_id);
  console.log(user_id, "joined lobby", game_id);
  game.players = 2;
  game.whiteId ? (game.blackId = user_id) : (game.whiteId = user_id);
  publisher.set(game_id, JSON.stringify(game));
}

export async function move(
  this: Socket,
  side: string,
  move: { to: string; from: string },
  game_id: string
) {
  console.log(
    side,
    "moved from",
    move.from,
    "to",
    move.to,
    "in the game",
    game_id
  );
  this.broadcast.emit(game_id, side, move);
}

export async function handleDisconnect() {}
