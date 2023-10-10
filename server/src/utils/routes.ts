import { FastifyInstance } from "fastify";
import gameRoutes from "../modules/game/game.route";
import userRoutes from "../modules/user/user.route";

export async function injectRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/api/users" });
  app.register(gameRoutes, { prefix: "/api/games" });
}
