"use client";

import { Button } from "../ui/button";
import { Play, UserPlus2 } from "lucide-react";
import Link from "next/link";
import useUserStore from "@/store/store";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { CreateLobbyDialog } from "./CreateGameDialog";
import StartGameButton from "./StartGameButton";
import { SignInAlert } from "./SignInAlert";

const HeroButtons = () => {
  const user = useUserStore.use.user();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="flex flex-col gap-3 md:flex-row pt-5 lg:pt-2">
        <StartGameButton />
        <Skeleton className="h-9 w-[250px] lg:w-[200px]" />
      </div>
    );

  return (
    <div className="flex flex-col gap-3 md:flex-row pt-5 lg:pt-2">
      {user ? <CreateLobbyDialog /> : <SignInAlert />}
      {!user && (
        <Button
          asChild
          className="flex items-center gap-2 cursor-pointer rounded-xl border-2 px-4 py-2 text-md"
          variant="ghost"
        >
          <Link href="sign-up">
            <span className="flex items-center justify-center gap-2 w-[200px] lg:w-fit">
              <UserPlus2 className="mr-1 h-5 w-5 stroke-[3]" />
              Create an account
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default HeroButtons;
