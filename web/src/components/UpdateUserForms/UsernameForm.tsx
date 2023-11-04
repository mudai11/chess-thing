"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../../../../server/src/types";
import { FC } from "react";
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
  UpdateUserUsernameSchema,
  updateUserUsernameSchema,
} from "@/types/user";
import { Icons } from "../Icons";
import { env } from "@/../env";
import { toast } from "@/hooks/useToast";

interface UserNameFormProps {
  user: Pick<User, "username">;
}

const UserNameForm: FC<UserNameFormProps> = ({ user }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserUsernameSchema>({
    resolver: zodResolver(updateUserUsernameSchema),
    defaultValues: {
      username: user.username || "",
    },
  });
  const onSubmit: SubmitHandler<UpdateUserUsernameSchema> = async (payload) => {
    try {
      const { data } = await axios.post(
        `${env.NEXT_PUBLIC_SERVER_URL}/api/users/update-user/username`,
        payload,
        { withCredentials: true }
      );
      if (data.message === "Success") {
        toast({
          title: "Username updated successfully.",
          description: "Your username name has been updated.",
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
        description: "Could update your username right now, try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>Enter the display name you prefer.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 pb-1 grid place-items-center">
              <span className="text-sm text-zinc-400">@</span>
            </div>
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              className="w-[400px] pl-6"
              size={32}
              {...register("username")}
            />
            <p className="px-1 h-1 text-xs text-red-500">
              {errors.username && errors.username.message}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSubmitting ? "Loading" : "Update username"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserNameForm;
