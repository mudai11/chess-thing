import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import io from "fastify-socket.io";

export async function injectPlugins(
  app: FastifyInstance,
  cors_origin: string,
  secret_key: string
) {
  await app.register(cors, {
    origin: cors_origin,
    credentials: true,
  });

  await app.register(jwt, {
    secret: secret_key,
    cookie: {
      cookieName: "accessToken",
      signed: false,
    },
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        reply.status(500).send(e);
      }
    }
  );

  await app.register(cookie, {
    secret: secret_key,
  });

  await app.register(io);
}
