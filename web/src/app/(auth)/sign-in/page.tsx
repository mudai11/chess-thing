import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SigninForm } from "@/components/Authenticate/SigninForm";
import Image from "next/image";
import banner from "@/../public/banner.webp";
import { ArrowLeft } from "lucide-react";
import { getImage } from "@/utils/getImage";

export const metadata: Metadata = {
  title: "Sign in | Chess Thing",
  description: "Sign in to Chess Thing.",
};

export default async function SigninPage() {
  const { base64 } = await getImage("./public/banner.webp");

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
                Log<span className="text-[#4a7dac]">in</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Dive into an exciting game of chess immediately.
              </p>
            </div>
            <SigninForm />
            <div className="flex flex-row items-center justify-center">
              <p>
                Don&apos;t have an account{" "}
                <span className="text-[#4a7dac] ">?</span>
              </p>{" "}
              <Link
                href="/sign-up"
                className={cn(buttonVariants({ variant: "link" }))}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
