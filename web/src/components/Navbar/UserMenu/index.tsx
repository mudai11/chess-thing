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
import userStore from "@/store/store";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/../../server/src/types";

interface UserMenuProps {
  user: User;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const clearUser = userStore.use.clearUser();
  const setUser = userStore.use.setUser();
  const { push, refresh } = useRouter();

  useEffect(() => {
    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <UserAvatar className="h-9 w-9" user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
          <Link href="/" >
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={`/@${user.username}`} >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/messages" >
            Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings" >
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
