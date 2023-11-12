import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useServerSession } from "@/hooks/useServerSession";
import UserMenu from "./UserMenu";
import { LogIn } from "lucide-react";

const Navbar = async () => {
  const user = await useServerSession();

  return (
    <header className="flex flex-row justify-around items-center pt-3">
      <Logo />
      <div className="flex flex-row gap-2">
        <ThemeToggle />
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex align-center justify-center gap-2 p-2 text-sm rounded-lg"
            )}
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
