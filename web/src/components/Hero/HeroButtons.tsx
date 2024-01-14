import { Button } from "../ui/button";
import { UserPlus2 } from "lucide-react";
import Link from "next/link";
import { CreateLobbyDialog } from "./CreateGameDialog";
import { SignInAlert } from "./SignInAlert";
import { useServerSession } from "@/hooks/useServerSession";

const HeroButtons = async () => {
  const user = await useServerSession();

  return (
    <div className="flex flex-col gap-3 md:flex-row pt-5 lg:pt-2">
      {user ? <CreateLobbyDialog /> : <SignInAlert />}
      {!user && (
        <Button
          asChild
          className="flex items-center gap-2 cursor-pointer rounded-md px-4 py-2 text-md"
          variant="outline"
        >
          <Link href="sign-up">
            <span className="flex items-center justify-center gap-2 w-[200px] lg:w-fit">
              <UserPlus2 className="mr-1 h-5 w-5" />
              Create an account
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default HeroButtons;
