"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import useUserStore from "@/stores/useUserStore";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: {
    id: string | null | undefined;
    username: string | null | undefined;
    image: string | null | undefined;
    email: string | null | undefined;
  };
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const { setUser, clearUser } = useUserStore();
  const { push, refresh } = useRouter();

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  const signoutHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL!}/api/users/sign-out`,
        {
          withCredentials: true,
        }
      );
      if (data.message === "Success") {
        clearUser();
        refresh();
        push("/");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data.error);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar
          className="h-9 w-9"
          user={{ username: user.username || null, image: user.image || null }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-inherit" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.username && <p className="font-medium">{user.username}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-500">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/" prefetch={false}>
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/@${user.username}`} prefetch={false}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/messages" prefetch={false}>
            Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings" prefetch={false}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signoutHandler();
          }}
          className="cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
