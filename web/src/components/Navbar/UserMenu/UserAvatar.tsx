"use client";

import { FC } from "react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import Image from "next/image";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: {
    username: string | null | undefined;
    image: string | null | undefined;
  };
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
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
          <span className="sr-only">{user?.username}</span>
          <User className="h-5 w-5" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
