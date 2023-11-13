import { Game } from "@prisma/client";
import { Socket } from "socket.io";
import { publisher } from "../main";
import { db } from "../utils/db";
import { Chess } from "chess.js";

type TCachedGame = Game & { players: number; host: string };

export async function joinLobby(
  this: Socket,
  game_id: string,
  username: string
) {
  try {
    const active_game = await publisher.get(game_id);
    if (!active_game) return;
    const game: TCachedGame = JSON.parse(active_game);
    if (game.host === username) {
      this.join(game_id);
      const side = game.black_player ? "b" : "w";
      this.nsp.to(game_id).emit("joined-lobby", side, username);
      return;
    }
    if (game.players === 2) {
      this.join(game_id);
      return;
    }
    this.join(game_id);
    const side = game.black_player ? "w" : "b";
    this.nsp.to(game_id).emit("joined-lobby", side, username);
    game.players = 2;
    game.white_player
      ? (game.black_player = username)
      : (game.white_player = username);
    await publisher.set(game_id, JSON.stringify(game));
  } catch (e) {
    console.log(e);
  }
}

export async function move(
  this: Socket,
  side: string,
  move: { to: string; from: string; promotion: string },
  game_id: string,
  username: string
) {
  try {
    const active_game = await publisher.get(game_id);
    if (!active_game) return;
    const game: TCachedGame = JSON.parse(active_game);
    if (game.winner || game.end_reason) return;
    const chess = new Chess();
    if (game.pgn) {
      chess.loadPgn(game.pgn);
    }
    const prev_turn = chess.turn();
    if (side === "w" && game.white_player != username) return;
    if (side === "b" && game.black_player != username) return;
    const new_move = chess.move(move);
    if (new_move) {
      game.pgn = chess.pgn();
      this.to(game_id).emit("sync-move", side, move);
      if (chess.isGameOver()) {
        let reason: Game["end_reason"] = null;
        let the_winner: string | null = null;
        let the_loser: string | null = null;
        if (chess.isCheckmate() && prev_turn === "w") {
          reason = "BLACK_CHECKMATED";
          the_winner = game.white_player!;
          the_loser = game.black_player!;
        }
        if (chess.isCheckmate() && prev_turn === "b") {
          reason = "WHITE_CHECKMATED";
          the_winner = game.black_player!;
          the_loser = game.white_player!;
        }
        if (
          chess.isStalemate() ||
          chess.isThreefoldRepetition() ||
          chess.isInsufficientMaterial() ||
          chess.isDraw()
        )
          reason = "DRAW";

        const { host, players, winner, pgn, end_reason, ...rest } = game;

        await db.game.update({
          where: {
            id: game_id,
          },
          data: {
            ...rest,
            winner: the_winner,
            end_reason: reason,
            pgn: chess.pgn(),
          },
        });
        if (reason === "DRAW") {
          await db.user.update({
            where: {
              username: game.white_player!,
            },
            data: {
              draws: {
                increment: 1,
              },
            },
          });
          await db.user.update({
            where: {
              username: game.black_player!,
            },
            data: {
              draws: {
                increment: 1,
              },
            },
          });
        } else {
          await db.user.update({
            where: {
              username: the_winner!,
            },
            data: {
              wins: {
                increment: 1,
              },
            },
          });
          await db.user.update({
            where: {
              username: the_loser!,
            },
            data: {
              losses: {
                increment: 1,
              },
            },
          });
        }

        await publisher.del(game_id);
      } else {
        await publisher.set(game_id, JSON.stringify(game));
      }
    } else {
      return;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function leaveLobby(
  this: Socket,
  game_id: string,
  username: string
) {
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  if (game.end_reason || game.winner) return;
  if (game.players === 1) {
    try {
      await db.game.delete({
        where: {
          id: game_id,
        },
      });
      await publisher.del(game_id);
    } catch (e) {
      console.log(e);
    }
    return;
  }
  if (game.white_player === username) {
    game.winner = game.black_player;
    game.end_reason = "WHITE_DISCONNECTED";
  } else {
    game.winner = game.white_player;
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
    console.log(e);
  }
}

export async function message(
  this: Socket,
  game_id: string,
  username: string,
  message: string
) {
  const active_game = await publisher.get(game_id);
  if (!active_game) return;
  const game: TCachedGame = JSON.parse(active_game);
  if (username != game.white_player && username != game.black_player) return;
  this.to(game_id).emit("sync-message", {
    author: username,
    message: message,
  });
}
