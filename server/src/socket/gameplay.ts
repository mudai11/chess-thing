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
      this.nsp.to(game_id).emit("joined-lobby", side, username, {
        white: game.white_player,
        black: game.black_player,
      });
      return;
    }
    if (game.players === 2) {
      this.join(game_id);
      this.nsp.to(game_id).emit("joined-lobby", "w", username, {
        white: game.white_player,
        black: game.black_player,
      });
      return;
    }
    this.join(game_id);
    game.players = 2;

    if (game.white_player) {
      game.black_player = username;
      await db.game.update({
        where: {
          id: game_id,
        },
        data: {
          black_player: username,
        },
      });
      this.nsp.to(game_id).emit("joined-lobby", "b", username, {
        white: game.white_player,
        black: game.black_player,
      });
    } else {
      game.white_player = username;
      await db.game.update({
        where: {
          id: game_id,
        },
        data: {
          white_player: username,
        },
      });
      this.nsp.to(game_id).emit("joined-lobby", "w", username, {
        white: game.white_player,
        black: game.black_player,
      });
    }

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
      this.to(game_id).emit("sync-move", move);
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

        game.winner = the_winner;
        game.end_reason = reason;
        game.pgn = chess.pgn();

        const { host, players, ...rest } = game;

        await db.game.update({
          where: {
            id: game_id,
          },
          data: {
            ...rest,
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
        this.nsp.to(game_id).emit("game-over", reason);
      }
      await publisher.set(game_id, JSON.stringify(game));
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
  if (game.end_reason || game.winner) {
    await publisher.del(game_id);
    return;
  }

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
  } else if (game.black_player === username) {
    game.winner = game.white_player;
    game.end_reason = "BLACK_DISCONNECTED";
  }

  const { host, players, id, ...rest } = game;
  this.nsp.to(game_id).emit("game-over", game.end_reason);

  try {
    await db.game.update({
      where: {
        id: game_id,
      },
      data: {
        ...rest,
      },
    });
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
