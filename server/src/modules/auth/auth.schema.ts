import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  verified_email: z.boolean(),
  username: z.string(),
  image: z.string(),
  with_provider: z.boolean(),
});

export type UserSchema = z.infer<typeof userSchema>;

export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    userSchema,
  },
  { $id: "auth" }
);
