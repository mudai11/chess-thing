"use client";

import { User } from "@/types/user";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Icons } from "../Icons";
import { env } from "@/../env";
import { toast } from "@/hooks/useToast";

interface ImageFormProps {
  user: Pick<User, "image">;
}

const ImageForm: FC<ImageFormProps> = ({ user }) => {
  const router = useRouter();

  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Your image</CardTitle>
          <CardDescription>Change your image.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1"></div>
        </CardContent>
        <CardFooter>
          <Button>Update Image</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ImageForm;
