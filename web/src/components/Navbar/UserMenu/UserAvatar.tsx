"use client";

import { FC } from "react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User as UserIcon } from "lucide-react";
import { User } from "@/../../server/src/types";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "username" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  if (!user) return;

  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            src={user.image}
            alt={user.username + "profile picture"}
            fill
            sizes="100%"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.username}</span>
          <UserIcon className="h-5 w-5" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
