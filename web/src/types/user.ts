import axios from "axios";
import { z } from "zod";
import { env } from "@/../env";

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

export const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8),
});

export const signinUserSchema = z.object({
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

export const updateUserUsernameSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(5)
    .max(10),
});

export const updateUserEmailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email(),
});

export const updateUserPasswordSchema = z
  .object({
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
    confirm_password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type SigninUserSchema = z.infer<typeof signinUserSchema>;
export type UpdateUserUsernameSchema = z.infer<typeof updateUserUsernameSchema>;
export type UpdateUserEmailSchema = z.infer<typeof updateUserEmailSchema>;
export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
