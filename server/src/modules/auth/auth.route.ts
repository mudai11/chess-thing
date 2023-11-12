import { FastifyInstance } from "fastify";
import { authenticateUserHandler, googleAuthHandler } from "./auth.controller";
import { $ref as sharedRef } from "../shared/response.schema";
import { $ref } from "./auth.schema";

export default async function authRoutes(app: FastifyInstance) {
  app.get(
    "/me",
    {
      schema: {
        response: {
          200: $ref("userSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    authenticateUserHandler
  );

  app.get("/google/callback", googleAuthHandler);
}
