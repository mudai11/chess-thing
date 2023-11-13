import { db } from "../../utils/db";

async function createGame(username: string, side: string) {
  if (side === "black") {
    return await db.game.create({
      data: {
        black_player: username,
      },
    });
  } else {
    return await db.game.create({
      data: {
        white_player: username,
      },
    });
  }
}

async function deleteGame(id: string) {
  return await db.game.delete({
    where: {
      id,
    },
  });
}

async function getGames() {
  return await db.game.findMany();
}

export { createGame, deleteGame, getGames };
