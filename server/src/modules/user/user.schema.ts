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
    .min(5, { message: "Username must be atleast 5 characters" })
    .max(10, { message: "Username must not be above 10 characters" }),
};

const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be atleast 8 characters" }),
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
    .min(5, { message: "Username must be atleast 5 characters" })
    .max(10, { message: "Username must not be above 10 characters" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be atleast 8 characters" }),
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
    .min(5, { message: "Username must be atleast 5 characters" })
    .max(10, { message: "Username must not be above 10 characters" })
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be atleast 8 characters" })
    .optional(),
});

const userUsernameSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(5, { message: "Username must be atleast 5 characters" })
    .max(10, { message: "Username must not be above 10 characters" }),
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
    .min(8, { message: "Password must be atleast 8 characters" }),
});

export const updateUserPasswordSchema = z
  .object({
    old_password: z
      .string({
        required_error: "Old password is required",
        invalid_type_error: "Old password must be a string",
      })
      .min(8, { message: "Old password must be atleast 8 characters" }),
    new_password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "New password must be atleast 8 characters" }),
    confirm_password: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Confirm password is invalid",
      })
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const deleteUserSchema = z.object({
  id: z.string().min(1, { message: "User id is required" }),
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
