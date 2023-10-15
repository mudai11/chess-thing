import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useServerSession } from "@/hooks/useServerSession";
import UserMenu from "./UserMenu";

const Navbar = async () => {
  const user = await useServerSession();

  return (
    <header className="flex flex-row justify-around items-center pt-4">
      <Logo />
      <div className="flex flex-row gap-2">
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Link
            href="/sign-in"
            className={cn(buttonVariants({ variant: "ghost" }), "text-md")}
          >
            Login
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
