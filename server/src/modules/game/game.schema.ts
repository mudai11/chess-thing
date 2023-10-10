import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createGameSchema = z.object({
  id: z.string(),
  side: z.enum(["black", "white"]),
});

const deleteGameSchema = z.object({
  id: z.string(),
});

export type CreateGameSchema = z.infer<typeof createGameSchema>;
export type DeleteGameSchema = z.infer<typeof deleteGameSchema>;

export const { schemas: gameSchemas, $ref } = buildJsonSchemas(
  {
    createGameSchema,
    deleteGameSchema,
  },
  { $id: "game" }
);
