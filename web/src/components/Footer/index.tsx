import { Icons } from "../Icons";
import { Linkedin, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 px-8 pb-0 text-sm font-light py-12">
      <div className="container flex flex-col-reverse justify-between gap-2 md:flex-row md:items-end">
        <span>
          Built by{" "}
          <span className="font-bold">
            mud<span className="text-[#4b7399]">ai</span>
          </span>
          .
        </span>
        <div className="flex gap-2">
          <a
            target="_blank"
            rel="noreferrer"
            className="group gap-1 md:inline-flex"
            href="https://github.com/mudai11/chess-thing"
          >
            <Icons.gitHub className="h-4 w-4 duration-150 group-hover:scale-110 fill-black dark:fill-white" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="group gap-1 md:inline-flex"
            href="https://twitter.com/aka_mudai"
          >
            <Icons.twitter className="h-4 w-4 duration-150 group-hover:scale-110 fill-black dark:fill-white" />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            className="group gap-1 md:inline-flex"
            href="https://www.linkedin.com/in/muhamed-aziz-issaoui"
          >
            <Linkedin className="h-4 w-4 duration-150 group-hover:scale-110 fill-black dark:fill-white" />
          </a>
        </div>
      </div>
      <div className="container flex flex-col justify-between gap-2 text-neutral-500 dark:text-neutral-400 md:flex-row md:items-end">
        <span>
          <Link
            href="/privacy"
            className="dark:hover:text-primary-foreground transition-colors duration-300 dark:hover:text-white hover:text-neutral-900 hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            href="/terms"
            className="dark:hover:text-primary-foreground transition-colors duration-300 dark:hover:text-white hover:text-neutral-900 hover:underline"
          >
            Terms of Service
          </Link>
        </span>
        <span>
          <div className="inline-block rotate-180">©</div>
          {new Date().getFullYear()} Chess Thing
        </span>
      </div>
    </footer>
  );
}
