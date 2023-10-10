import { FastifyInstance } from "fastify";
import { gameSchemas } from "../modules/game/game.schema";
import { responseSchemas } from "../modules/shared/response.schema";
import { userSchemas } from "../modules/user/user.schema";

export async function injectSchemas(app: FastifyInstance) {
  for (const schema of [...userSchemas, ...gameSchemas, ...responseSchemas]) {
    app.addSchema(schema);
  }
}
