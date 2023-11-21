import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createGameSchema = z.object({
  username: z.string(),
  side: z.enum(["black", "white"]),
});

const gameIdSchema = z.object({
  id: z.string(),
});

export type CreateGameSchema = z.infer<typeof createGameSchema>;
export type GameIdSchema = z.infer<typeof gameIdSchema>;

export const { schemas: gameSchemas, $ref } = buildJsonSchemas(
  {
    createGameSchema,
    gameIdSchema,
  },
  { $id: "game" }
);
