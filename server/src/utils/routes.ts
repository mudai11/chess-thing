import { FastifyInstance } from "fastify";
import gameRoutes from "../modules/game/game.route";
import userRoutes from "../modules/user/user.route";
import authRoutes from "../modules/auth/auth.route";

export async function injectRoutes(app: FastifyInstance) {
  await app.register(userRoutes, { prefix: "/api/users" });
  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(gameRoutes, { prefix: "/api/games" });
}
