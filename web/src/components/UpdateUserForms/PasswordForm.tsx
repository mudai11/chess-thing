"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  UpdateUserPasswordSchema,
  updateUserPasswordSchema,
} from "@/lib/validators/user";
import { Icons } from "../Icons";
import { env } from "@/../env";
import { toast } from "@/hooks/useToast";

const PasswordForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserPasswordSchema>({
    resolver: zodResolver(updateUserPasswordSchema),
  });
  const onSubmit: SubmitHandler<UpdateUserPasswordSchema> = async (payload) => {
    try {
      const { data } = await axios.patch(
        `${env.NEXT_PUBLIC_SERVER_URL}/api/users/update-user/password`,
        payload,
        { withCredentials: true }
      );
      if (data.message === "Success") {
        toast({
          title: "Password updated successfully.",
          description: "Your password has been updated.",
        });
        router.refresh();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        return toast({
          title: "We have a little problem.",
          description: err.response?.data.error,
          variant: "destructive",
        });
      }
      toast({
        title: "An error has occured!",
        description: "Could update your password right now, try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Your password</CardTitle>
          <CardDescription>Change your password.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="relative grid gap-2">
            <Label htmlFor="old_password">Old password</Label>
            <Input
              id="old_password"
              className="max-w-[400px]"
              size={32}
              type="password"
              {...register("old_password")}
            />
            <p className="px-1 h-1 text-xs text-red-500">
              {errors.old_password && errors.old_password.message}
            </p>
          </div>
          <div className="relative grid gap-2">
            <Label htmlFor="new_password">New password</Label>
            <Input
              id="new_password"
              className="max-w-[400px]"
              size={32}
              type="password"
              {...register("new_password")}
            />
            <p className="px-1 h-1 text-xs text-red-500">
              {errors.new_password && errors.new_password.message}
            </p>
          </div>
          <div className="relative grid gap-2">
            <Label htmlFor="confirm_password">Confirm password</Label>
            <Input
              id="confirm_password"
              className="max-w-[400px]"
              size={32}
              type="password"
              {...register("confirm_password")}
            />
            <p className="px-1 h-1 text-xs text-red-500">
              {errors.confirm_password && errors.confirm_password.message}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSubmitting ? "Loading" : "Update password"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PasswordForm;
