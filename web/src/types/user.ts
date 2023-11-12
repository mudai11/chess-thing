import { z } from "zod";

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
      invalid_type_error: "Username is invalid",
    })
    .min(5, { message: "Username must be atleast 5 characters" })
    .max(25, { message: "Username must not be above 25 characters" }),
};

export const createUserSchema = z
  .object({
    ...userCore,
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password is invalid",
      })
      .min(8, { message: "Password must be atleast 8 characters" }),
    confirm_password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password is invalid",
      })
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const signinUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username is invalid",
    })
    .min(5, { message: "Username must be atleast 5 characters" })
    .max(25, { message: "Username must not be above 25 characters" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password is invalid",
    })
    .min(8, { message: "Password must be atleast 8 characters" }),
});

export const updateUserUsernameSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username is invalid",
    })
    .min(5, { message: "Username must be atleast 5 characters" })
    .max(25, { message: "Username must not be above 25 characters" }),
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
        invalid_type_error: "Old password is invalid",
      })
      .min(8, { message: "Old password must be atleast 8 characters" }),
    new_password: z
      .string({
        required_error: "New password is required",
        invalid_type_error: "New password is invalid",
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

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type SigninUserSchema = z.infer<typeof signinUserSchema>;
export type UpdateUserUsernameSchema = z.infer<typeof updateUserUsernameSchema>;
export type UpdateUserEmailSchema = z.infer<typeof updateUserEmailSchema>;
export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
