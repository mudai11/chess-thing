import { db } from "../../utils/db";

async function createGame(id: string, side: string) {
  if (side === "black") {
    return await db.game.create({
      data: {
        blackId: id,
      },
    });
  } else {
    return await db.game.create({
      data: {
        whiteId: id,
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
