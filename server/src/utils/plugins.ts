import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import oauth from "@fastify/oauth2";
import io from "fastify-socket.io";

export async function injectPlugins(
  app: FastifyInstance,
  origin: string,
  secret_key: string,
  server_url: string,
  google_client_id: string,
  google_client_secret: string,
  google_oauth_redirect_url: string
) {
  await app.register(cors, {
    origin: origin,
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
      } catch (e: any) {
        if (e.statusCode === 401) {
          return reply.status(401).send({ error: "Unauthorized." });
        }
        return reply.status(500).send({ error: "Could not verify token." });
      }
    }
  );

  await app.register(cookie, {
    secret: secret_key,
  });

  await app.register(oauth, {
    name: "googleOAuth2",
    scope: ["email", "profile"],
    credentials: {
      client: {
        id: google_client_id,
        secret: google_client_secret,
      },
      auth: oauth.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/api/auth/google",
    callbackUri: `${server_url}/${google_oauth_redirect_url}`,
  });

  await app.register(io, {
    cors: {
      origin: origin,
    },
  });
}
