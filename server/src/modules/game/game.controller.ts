import { FastifyReply, FastifyRequest } from "fastify";
import { CreateGameSchema, DeleteGameSchema } from "./game.schema";
import { createGame, deleteGame, getGames } from "./game.service";
import { publisher } from "../../main";

async function createGameHandler(
  request: FastifyRequest<{ Body: CreateGameSchema }>,
  reply: FastifyReply
) {
  const id = request.body.id;
  const side = request.body.side;

  try {
    const game = await createGame(id, side);
    const game_cache = { ...game, host: id, players: 1 };
    await publisher.set(game.id, JSON.stringify(game_cache));
    return reply.status(201).send({
      message: game.id,
    });
  } catch (e) {
    return reply.status(500).send(e);
  }
}

async function deleteGameHandler(
  request: FastifyRequest<{ Body: DeleteGameSchema }>,
  reply: FastifyReply
) {
  const id = request.body.id;

  try {
    await deleteGame(id);
    return reply.status(200).send({
      message: "Success",
    });
  } catch (e) {
    return reply.status(500).send(e);
  }
}

async function getGamesHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const games = await getGames();
    return reply.status(200).send(games);
  } catch (e) {
    return reply.status(500).send(e);
  }
}

export { createGameHandler, deleteGameHandler, getGamesHandler };
