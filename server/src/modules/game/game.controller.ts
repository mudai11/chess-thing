import { FastifyReply, FastifyRequest } from "fastify";
import { CreateGameSchema, DeleteGameSchema } from "./game.schema";
import { createGame, deleteGame, getGames } from "./game.service";
import { app, publisher } from "../../main";
import { findUserById } from "../user/user.service";

async function createGameHandler(
  request: FastifyRequest<{ Body: CreateGameSchema }>,
  reply: FastifyReply
) {
  try {
    const id = request.body.id;
    const side = request.body.side;
    const token = request.cookies["accessToken"]!;

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
    const game = await createGame(id, side);
    const game_cache = { ...game, host: id, players: 1 };
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
    return reply
      .status(500)
      .send({ error: "Could not delete game right now, try again later." });
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

export { createGameHandler, deleteGameHandler, getGamesHandler };
