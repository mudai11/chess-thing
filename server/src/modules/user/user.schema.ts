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

const userUsernameSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(5)
    .max(10),
});

const userEmailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email(),
});

const userPasswordSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8),
});

const updateUserPasswordSchema = z.object({
  old_password: z
    .string({
      required_error: "Old password is required",
      invalid_type_error: "Old password must be a string",
    })
    .min(8),
  new_password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8),
});

const deleteUserSchema = z.object({
  id: z.string().min(1),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type SigninUserSchema = z.infer<typeof signinUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
export type UserUsernameSchema = z.infer<typeof userUsernameSchema>;
export type UserEmailSchema = z.infer<typeof userEmailSchema>;
export type UserPasswordSchema = z.infer<typeof userPasswordSchema>;
export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    signinUserSchema,
    updateUserSchema,
    userUsernameSchema,
    userEmailSchema,
    userPasswordSchema,
    updateUserPasswordSchema,
    deleteUserSchema,
  },
  { $id: "user" }
);
