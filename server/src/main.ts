import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { secret_key } from "./utils/env";

export const app: FastifyInstance = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(jwt, {
  secret: secret_key,
  cookie: {
    cookieName: "accessToken",
    signed: false,
  },
});

app.register(cookie, {
  secret: secret_key,
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

app.get("/", async function handler(_, reply) {
  reply.status(200).send("Welcome to Chess Thing server! 🎉");
});

async function main() {
  for (const schema of userSchemas) {
    app.addSchema(schema);
  }

  app.register(userRoutes, { prefix: "/api/users" });

  try {
    app.listen({ port: 8080 }, (_, address) => {
      console.log(`server listening on: ${address}`);
    });
  } catch (e) {
    console.error("Server error: ", e);
    process.exit(1);
  }
}

main();
