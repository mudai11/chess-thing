"use client";

import { Button } from "../ui/button";
import { Play, UserPlus2 } from "lucide-react";
import Link from "next/link";
import useUserStore from "@/store/store";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const HeroButtons = () => {
  const user = useUserStore.use.user();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="flex flex-col gap-3 md:flex-row pt-5 lg:pt-2">
        <Button
          asChild
          className="hero-play-button group relative w-fit overflow-hidden rounded-xl p-[2px] font-bold transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_2rem_-0.5rem_#f59e0b] dark:hidden md:mr-0 lg:mr-auto"
        >
          <div className="cursor-pointer">
            <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-[10px] bg-white px-4 py-2 text-md text-amber-500 transition-all duration-300">
              <Play className="mr-1 h-5 w-5" />
              Start a game
            </span>
          </div>
        </Button>
        <Button
          asChild
          className="hero-play-button-dark group relative mx-auto hidden w-fit overflow-hidden rounded-xl p-[1px] font-bold transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] md:mr-0 lg:mr-auto"
        >
          <div className="cursor-pointer">
            <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-xl px-4 py-2 text-md transition-all duration-300 dark:bg-neutral-900 dark:text-white group-hover:dark:bg-black">
              <Play className="mr-1 h-4 w-4" />
              Start a game
            </span>
          </div>
        </Button>
        <Skeleton className="h-9 w-[250px] lg:w-[200px]" />
      </div>
    );

  return (
    <div className="flex flex-col gap-3 md:flex-row pt-5 lg:pt-2">
      <Button
        asChild
        className="hero-play-button group relative w-fit overflow-hidden rounded-xl p-[2px] font-bold transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_2rem_-0.5rem_#f59e0b] dark:hidden md:mr-0 lg:mr-auto"
      >
        <div className="cursor-pointer">
          <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-[10px] bg-white px-4 py-2 text-md text-amber-500 transition-all duration-300">
            <Play className="mr-1 h-5 w-5" />
            Start a game
          </span>
        </div>
      </Button>
      <Button
        asChild
        className="hero-play-button-dark group relative mx-auto hidden w-fit overflow-hidden rounded-xl p-[1px] font-bold transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] md:mr-0 lg:mr-auto"
      >
        <div className="cursor-pointer">
          <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-xl px-4 py-2 text-md transition-all duration-300 dark:bg-neutral-900 dark:text-white group-hover:dark:bg-black">
            <Play className="mr-1 h-4 w-4" />
            Start a game
          </span>
        </div>
      </Button>
      {!user && (
        <Button
          asChild
          className="flex items-center gap-2 cursor-pointer rounded-xl border-2 px-4 py-2 text-md"
          variant="ghost"
        >
          <Link href="sign-up" prefetch={false}>
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
