import Fastify, { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { OAuth2Namespace } from "@fastify/oauth2";
import { injectPlugins } from "./utils/plugins";
import { injectRoutes } from "./utils/routes";
import { injectSchemas } from "./utils/schemas";
import { injectSocket } from "./socket/socket";
import Redis from "ioredis";
import { env } from "../env";

export const app: FastifyInstance = Fastify();
export const publisher = new Redis(env.REDIS_URL);
export const subscriber = new Redis(env.REDIS_URL);
const port = parseInt(env.PORT, 10);
const host = env.HOST;

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

async function build() {
  await injectPlugins(
    app,
    env.ORIGIN,
    env.SECRET_KEY,
    env.SERVER_URL,
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    env.GOOGLE_OAUTH_REDIRECT_URL
  );

  await injectRoutes(app);

  await injectSchemas(app);

  app.get("/", async function handler(_, reply) {
    reply.status(200).send("Welcome to chess thing server! 🎉");
  });
}

export async function main() {
  await build();

  app.io.on("connection", injectSocket);

  try {
    app.listen({ host: host, port: port }, () => {
      console.log(`server listening on: http://localhost:${port}`);
    });
  } catch (e) {
    console.error("Server error: ", e);
    process.exit(1);
  }
}
