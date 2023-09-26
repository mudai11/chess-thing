import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  return (
    <header className="flex flex-row justify-around items-center pt-4">
      <Logo />
      <div className="flex flex-row gap-2">
        <Link
          href="sign-in"
          className={cn(buttonVariants({ variant: "link" }), "text-md")}
        >
          Login
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
