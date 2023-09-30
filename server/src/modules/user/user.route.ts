import { FastifyInstance } from "fastify";
import {
  authenticateUserHandler,
  createUserHandler,
  getUsersHandler,
  signinUserHandler,
  updateUserHandler,
  deleteSessionHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

export default async function userRoutes(app: FastifyInstance) {
  app.post(
    "/create-user",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("defaultSuccessResponseSchema"),
          400: $ref("defaultErrorResponseSchema"),
        },
      },
    },
    createUserHandler
  );

  app.post(
    "/sign-in",
    {
      schema: {
        body: $ref("signinUserSchema"),
        response: {
          200: $ref("defaultSuccessResponseSchema"),
          400: $ref("defaultErrorResponseSchema"),
        },
      },
    },
    signinUserHandler
  );

  app.post(
    "/update-user",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("updateUserSchema"),
        response: {
          200: $ref("defaultSuccessResponseSchema"),
          400: $ref("defaultErrorResponseSchema"),
        },
      },
    },
    updateUserHandler
  );

  app.delete(
    "/sign-out",
    {
      preHandler: [app.authenticate],
      schema: {
        response: {
          200: $ref("defaultSuccessResponseSchema"),
          400: $ref("defaultErrorResponseSchema"),
        },
      },
    },
    deleteSessionHandler
  );

  app.get(
    "/me",
    {
      schema: {
        response: {
          400: $ref("defaultErrorResponseSchema"),
        },
      },
    },
    authenticateUserHandler
  );

  app.get("/", getUsersHandler);
}
