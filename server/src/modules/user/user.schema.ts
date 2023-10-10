import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email(),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(5)
    .max(10),
};

const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8),
});

const createUserResponseSchema = z.object({
  id: z.string(),
  ...userCore,
});

const signinUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(5)
    .max(10),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8),
});
const updateUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email()
    .optional(),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(5)
    .max(10)
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8)
    .optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type SigninUserSchema = z.infer<typeof signinUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    signinUserSchema,
    updateUserSchema,
  },
  { $id: "user" }
);
