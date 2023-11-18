"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/user";
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
  UpdateUserEmailSchema,
  updateUserEmailSchema,
} from "@/lib/validators/user";
import { Icons } from "../Icons";
import { env } from "@/../env";
import { toast } from "@/hooks/useToast";

interface EmailFormProps {
  user: Pick<User, "email">;
}

const EmailForm: FC<EmailFormProps> = ({ user }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserEmailSchema>({
    resolver: zodResolver(updateUserEmailSchema),
    defaultValues: {
      email: user.email || "",
    },
  });
  const onSubmit: SubmitHandler<UpdateUserEmailSchema> = async (payload) => {
    try {
      const { data } = await axios.patch(
        `${env.NEXT_PUBLIC_SERVER_URL}/api/users/update-user/email`,
        payload,
        { withCredentials: true }
      );
      if (data.message === "Success") {
        toast({
          title: "Email updated successfully.",
          description: "Your email name has been updated.",
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
        description: "Could not update your email right now, try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Your email</CardTitle>
          <CardDescription>Change your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              className="max-w-[400px]"
              size={32}
              {...register("email")}
            />
            <p className="px-1 h-1 text-xs text-red-500">
              {errors.email && errors.email.message}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSubmitting ? "Loading" : "Update email"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default EmailForm;
