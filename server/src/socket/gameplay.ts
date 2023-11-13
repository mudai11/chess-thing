import { Game } from "@prisma/client";
import { Socket } from "socket.io";
import { publisher } from "../main";
import { db } from "../utils/db";

type TCachedGame = Game & { players: number; host: string };

export async function joinLobby(
  this: Socket,
  game_id: string,
  user_id: string
) {
  console.log(`user ${user_id} trying to join ${game_id}`);
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  if (game.host === user_id) {
    this.join(game_id);
    const side = game.blackId ? "b" : "w";
    this.nsp.to(game_id).emit("joined-lobby", side, user_id);
    return;
  }
  if (game.players === 2) {
    this.join(game_id);
    return;
  }
  this.join(game_id);
  const side = game.blackId ? "w" : "b";
  this.nsp.to(game_id).emit("joined-lobby", side, user_id);
  game.players = 2;
  game.whiteId ? (game.blackId = user_id) : (game.whiteId = user_id);
  await publisher.set(game_id, JSON.stringify(game));
}

export async function move(
  this: Socket,
  side: string,
  move: { to: string; from: string; promotion: string },
  game_id: string,
  user_id: string
) {
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  if (side === "w" && game.whiteId != user_id) return;
  if (side === "b" && game.blackId != user_id) return;
  this.to(game_id).emit("sync-move", side, move);
}

export async function leaveLobby(
  this: Socket,
  game_id: string,
  user_id: string
) {
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  if (game.players === 1) {
    try {
      await db.game.delete({
        where: {
          id: game_id,
        },
      });
      await publisher.del(game_id);
    } catch (e) {
      this.to(user_id).emit("oops", e);
    }
    return;
  }
  if (game.whiteId === user_id) {
    game.winner = game.blackId;
    game.end_reason = "WHITE_DISCONNECTED";
  } else {
    game.winner = game.whiteId;
    game.end_reason = "BLACK_DISCONNECTED";
  }
  const { host, players, id, ...rest } = game;
  try {
    await db.game.update({
      where: {
        id: game_id,
      },
      data: {
        ...rest,
      },
    });
    await publisher.del(game_id);
  } catch (e) {
    this.to(user_id).emit("oops", e);
  }
}

export async function gameOver(
  this: Socket,
  game_id: string,
  end_reason: Game["end_reason"]
) {
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  switch (end_reason) {
    case "DRAW":
      game.end_reason = "DRAW";
      break;
    case "BLACK_CHECKMATED":
      game.end_reason = "BLACK_CHECKMATED";
      game.winner = game.whiteId;
      break;
    case "WHITE_CHECKMATED":
      game.end_reason = "WHITE_CHECKMATED";
      game.winner = game.whiteId;
      break;
    case "BLACK_RESIGNED":
      game.end_reason = "BLACK_RESIGNED";
      game.winner = game.whiteId;
      break;
    case "WHITE_RESIGNED":
      game.end_reason = "WHITE_RESIGNED";
      game.winner = game.blackId;
      break;
  }
  const { host, players, id, ...rest } = game;
  try {
    await db.game.update({
      where: {
        id: game_id,
      },
      data: {
        ...rest,
      },
    });
    await publisher.del(game_id);
  } catch (e) {
    this.to(game_id).emit("oops", e);
  }
}

export async function message(
  this: Socket,
  game_id: string,
  user_id: string,
  username: string,
  message: string
) {
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  if (user_id != game.whiteId && user_id != game.blackId) return;
  this.to(game_id).emit("sync-message", {
    author: username,
    message: message,
  });
}
