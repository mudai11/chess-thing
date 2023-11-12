import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignupForm } from "@/components/Authenticate/SignupForm";
import Image from "next/image";
import banner from "../../../../public/assets/banner/banner.webp";
import { ArrowLeft } from "lucide-react";
import { getImage } from "@/utils/getImage";

export const metadata: Metadata = {
  title: "Sign up | Chess Thing",
  description: "Sign up to Chess Thing.",
};

export default async function SignupPage() {
  const { base64 } = await getImage("./public/assets/banner/banner.webp");

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="hidden lg:flex relative w-[100%]">
        <Image
          src={banner.src}
          alt="Banner Image"
          fill
          priority
          sizes="100%"
          blurDataURL={base64}
          placeholder="blur"
        />
      </div>
      <div className="container relative h-full flex-col items-center justify-center lg:px-0">
        <div className="p-8">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "ghost" }), "rounded-lg")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="mx-auto flex w-full pt-14 flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                <span className="text-[#4a7dac]">Cr</span>eate an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Dive into an exciting game of chess immediately.
              </p>
            </div>
            <SignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-row items-center justify-center">
              <p>
                Already got an account <span className="text-[#4a7dac]">?</span>{" "}
              </p>{" "}
              <Link
                href="/sign-in"
                className={cn(buttonVariants({ variant: "link" }))}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
