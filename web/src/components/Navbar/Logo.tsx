"use client";

import Image from "next/image";
import logo from "../../../public/assets/logo/navbarlogo.png";
import darklogo from "../../../public/assets/logo/navbarlogodark.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

const Logo = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="flex flex-row gap-2 items-center">
        <Skeleton className="h-5 w-[180.5px]" />
      </div>
    );

  return (
    <Link className="flex flex-row gap-2 items-center cursor-pointer" href="/">
      <Image
        src={theme === "light" ? logo.src : darklogo.src}
        alt="navbar logo"
        width={25}
        height={25}
      />
      <label className="cursor-pointer font-bold text-2xl bg-gradient-to-r from-black to-amber-500 dark:from-white dark:to-amber-500  text-transparent bg-clip-text">
        Chess Thing
      </label>
    </Link>
  );
};

export default Logo;
