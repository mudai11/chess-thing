import { FastifyInstance } from "fastify";
import gameRoutes from "../modules/game/game.route";
import userRoutes from "../modules/user/user.route";

export async function injectRoutes(app: FastifyInstance) {
  await app.register(userRoutes, { prefix: "/api/users" });
  await app.register(gameRoutes, { prefix: "/api/games" });
}
