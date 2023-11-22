import { User } from "@/types/user";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Fingerprint } from "lucide-react";

type ProfileHeaderProps = {
  user: Pick<
    User,
    "username" | "image" | "wins" | "losses" | "draws" | "created_at"
  >;
};

export async function ProfileHeader({ user }: ProfileHeaderProps) {
  const date = new Date(user.created_at);
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-5">
      <Avatar className="h-[80px] w-[80px]">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.username + " profile image"}
            width={80}
            height={80}
          />
        ) : (
          <AvatarFallback>
            <UserIcon className="h-[50px] w-[50px]" strokeWidth="1" />
          </AvatarFallback>
        )}
      </Avatar>
      <h1 className="font-bold text-lg">{user.username}</h1>
      <div className="flex h-5 items-center space-x-4 text-sm font-semibold">
        <span>
          <span className="text-emerald-500">{user.wins}</span> wins
        </span>
        <Separator orientation="vertical" className="h-5" />
        <span>{user.draws} draws</span>
        <Separator orientation="vertical" />
        <span>
          <span className="text-red-500">{user.losses}</span> losses
        </span>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <Fingerprint className="h-5 w-5" />
        <span>{`${month} ${day}, ${year}.`}</span>
      </div>
    </div>
  );
}
