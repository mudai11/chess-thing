import { FastifyInstance } from "fastify";
import {
  authenticateUserHandler,
  createUserHandler,
  getUsersHandler,
  signinUserHandler,
  deleteSessionHandler,
  deleteUserHandler,
  updateUserUsernameHandler,
  updateUserEmailHandler,
  updateUserPasswordHandler,
} from "./user.controller";
import { $ref } from "./user.schema";
import { $ref as sharedRef } from "../shared/response.schema";

export default async function userRoutes(app: FastifyInstance) {
  app.post(
    "/create-user",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
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
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    signinUserHandler
  );

  app.post(
    "/update-user/username",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("userUsernameSchema"),
        response: {
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    updateUserUsernameHandler
  );

  app.post(
    "/update-user/email",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("userEmailSchema"),
        response: {
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    updateUserEmailHandler
  );

  app.post(
    "/update-user/password",
    {
      preHandler: [app.authenticate],
      schema: {
        body: $ref("updateUserPasswordSchema"),
        response: {
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    updateUserPasswordHandler
  );

  app.delete(
    "/sign-out",
    {
      preHandler: [app.authenticate],
      schema: {
        response: {
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
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
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    authenticateUserHandler
  );

  app.delete(
    "/delete-user",
    {
      schema: {
        body: $ref("deleteUserSchema"),
        response: {
          200: sharedRef("defaultSuccessResponseSchema"),
          400: sharedRef("defaultErrorResponseSchema"),
        },
      },
    },
    deleteUserHandler
  );

  app.get("/", getUsersHandler);
}
