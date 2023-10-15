import Fastify, { FastifyInstance } from "fastify";
import { Server } from "socket.io";
import { injectPlugins } from "./utils/plugins";
import { injectRoutes } from "./utils/routes";
import { injectSchemas } from "./utils/schemas";
import { injectSocket } from "./socket/socket";
import Redis from "ioredis";
import { env } from "../env";

export const app: FastifyInstance = Fastify();
export const publisher = new Redis(env.REDIS_URL);
const subscriber = new Redis(env.REDIS_URL);
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

async function build() {
  await injectPlugins(app, env.CORS_ORIGIN, env.SECRET_KEY);

  await injectRoutes(app);

  await injectSchemas(app);

  app.get("/", async function handler(_, reply) {
    reply.status(200).send("Welcome to Chess Thing server! 🎉");
  });
}

async function main() {
  await build();

  app.io.on("connection", injectSocket);

  try {
    app.listen({ host: host, port: port }, (_, address) => {
      console.log(`server listening on: ${address}`);
    });
  } catch (e) {
    console.error("Server error: ", e);
    process.exit(1);
  }
}

main();
