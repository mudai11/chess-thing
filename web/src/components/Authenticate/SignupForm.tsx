"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { HTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Icons } from "../Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserSchema, createUserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/useToast";

interface SignupFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<CreateUserSchema> = async (payload) => {
    if (!isValid) return;
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL!}/api/users/create-user`,
        payload
      );
      if (data.message === "Success") {
        toast({
          title: "Welcome.",
          description: "Your account has been created successfully.",
        });
        return;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast({
          title: "We have a little problem.",
          description: e.response?.data.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "An error has occured !",
        description:
          "Could not create an account for you right now, try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-left" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("email")}
              className="dark:focus-visible:ring-amber-500"
            />
            <p className="text-red-500 h-4 text-sm">
              {errors.email && <span>Please enter a valid Email !</span>}
            </p>
          </div>
          <div className="grid gap-1">
            <Label className="text-left" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="username"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("username")}
              className="dark:focus-visible:ring-amber-500"
            />
            <p className="text-red-500 h-4 text-sm">
              {errors.username && (
                <span>Username must be between 5 and 10 characters !</span>
              )}
            </p>
          </div>
          <div className="grid gap-1">
            <Label className="text-left" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register("password")}
              className="dark:focus-visible:ring-amber-500"
            />
            <p className="text-red-500 h-4 text-sm">
              {errors.password && (
                <span>Password must be atleast 8 characters long !</span>
              )}
            </p>
          </div>
          <Button disabled={isSubmitting} className="mt-2">
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isSubmitting}>
        <Icons.google className="mr-2 h-4 w-4" /> Google
      </Button>
    </div>
  );
}
