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
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/../../server/src/types";
import { env } from "@/../env";
import { toast } from "@/hooks/useToast";

interface UserMenuProps {
  user: User;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const clearUser = useUserStore((state) => state.clearUser);
  const setUser = useUserStore((state) => state.setUser);
  const { push, refresh } = useRouter();

  useEffect(() => {
    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signoutHandler = async () => {
    try {
      const { data } = await axios.delete(
        `${env.NEXT_PUBLIC_SERVER_URL}/api/users/sign-out`,
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
        toast({
          title: "We have a little problem.",
          description: e.response?.data.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "An error has occured !",
          description: "Could not sign you out right now, try again later.",
          variant: "destructive",
        });
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
          <Link href={`/@${user.username}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/messages">Messages</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings">Settings</Link>
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
