import { FastifyInstance } from "fastify";
import { deleteGameHandler, getGamesHandler } from "./game.controller";
import { createGameHandler } from "./game.controller";
import { $ref } from "./game.schema";
import { $ref as sharedRef } from "../shared/response.schema";

export default async function gameRoutes(app: FastifyInstance) {
  app.post(
    "/create-game",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("createGameSchema"),
        response: {
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    createGameHandler
  );

  app.delete(
    "/delete-game",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("deleteGameSchema"),
        response: {
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    deleteGameHandler
  );

  app.get("/", getGamesHandler);
}
