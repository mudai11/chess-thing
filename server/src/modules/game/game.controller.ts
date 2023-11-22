import { FastifyReply, FastifyRequest } from "fastify";
import { CreateGameSchema, GameIdSchema } from "./game.schema";
import { createGame, deleteGame, getGame, getGames } from "./game.service";
import { app, publisher } from "../../main";
import { findUserById } from "../user/user.service";

async function createGameHandler(
  request: FastifyRequest<{ Body: CreateGameSchema }>,
  reply: FastifyReply
) {
  try {
    const username = request.body.username;
    const side = request.body.side;
    const token = request.cookies["session.access.token"]!;

    const decoded: {
      id: string;
      iat: string;
    } | null = app.jwt.decode(token);

    if (!decoded) {
      return reply.status(400).send({
        error: "Access token is invalid.",
      });
    }

    const user = await findUserById(decoded.id);

    if (!user) {
      return reply.status(400).send({
        error: "Token does not associate to any user.",
      });
    }

    const game = await createGame(username, side);
    const game_cache = { ...game, host: username, players: 1 };
    await publisher.set(game.id, JSON.stringify(game_cache));
    return reply.status(201).send({
      message: game.id,
    });
  } catch (e) {
    return reply
      .status(500)
      .send({ error: "Could not create a game right now, try again later." });
  }
}

async function deleteGameHandler(
  request: FastifyRequest<{ Body: GameIdSchema }>,
  reply: FastifyReply
) {
  try {
    const id = request.body.id;
    const token = request.cookies["session.access.token"]!;

    const decoded: {
      id: string;
      iat: string;
    } | null = app.jwt.decode(token);

    if (!decoded) {
      return reply.status(400).send({
        error: "Access token is invalid.",
      });
    }

    const user = await findUserById(decoded.id);

    if (!user) {
      return reply.status(400).send({
        error: "Token does not associate to any user.",
      });
    }

    await deleteGame(id);
    return reply.status(200).send({
      message: "Success",
    });
  } catch (e) {
    return reply
      .status(500)
      .send({ error: "Could not delete game right now, try again later." });
  }
}

async function getGameHandler(
  request: FastifyRequest<{
    Params: GameIdSchema;
  }>,
  reply: FastifyReply
) {
  try {
    const id = request.params.id;
    const game = await getGame(id);

    if (!game) return reply.status(404).send({ error: "Game does not exist." });

    return reply.status(200).send(game);
  } catch (e) {
    return reply
      .status(500)
      .send({ error: "Could not get game right now, try again later." });
  }
}

async function getGamesHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const games = await getGames();
    return reply.status(200).send(games);
  } catch (e) {
    return reply
      .status(500)
      .send({ error: "Could not get games right now, try again later." });
  }
}

export {
  createGameHandler,
  deleteGameHandler,
  getGameHandler,
  getGamesHandler,
};
