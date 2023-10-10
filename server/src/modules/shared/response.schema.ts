import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const defaultSuccessResponseSchema = z.object({
  message: z.string(),
});

const defaultErrorResponseSchema = z.object({
  error: z.string(),
});

export const { schemas: responseSchemas, $ref } = buildJsonSchemas(
  {
    defaultSuccessResponseSchema,
    defaultErrorResponseSchema,
  },
  { $id: "response" }
);
