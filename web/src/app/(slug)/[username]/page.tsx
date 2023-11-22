import { ProfileGames } from "@/components/Profile/ProfileGames";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileStats } from "@/components/Profile/ProfileStats";
import { Separator } from "@/components/ui/separator";
import { getUserGames, getUserHeader } from "@/lib/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params: { username },
}: pageProps): Promise<Metadata> {
  const user = await getUserHeader(username.slice(3));
  if (!user) {
    return {
      title: `Not found | Chess Thing`,
      description: "User not found",
    };
  }

  return {
    title: `@${user.username} | Chess Thing`,
    description: `${user.username} profile page.`,
  };
}

export default async function Profile({ params: { username } }: pageProps) {
  const user = await getUserHeader(username.slice(3));
  const games = await getUserGames(username.slice(3));

  if (!user) return notFound();

  return (
    <main className="flex items-start justify-center pt-10 px-2 min-h-screen">
      <section className="flex flex-col items-center justify-center border w-full max-w-[1200px] rounded-lg">
        <ProfileHeader user={user} />
        <Separator className="w-[92%]" />
        <div className="flex flex-col-reverse md:flex-row w-full md:px-12">
          <ProfileGames games={games} username={username.slice(3)} />
          <ProfileStats games={games} username={username.slice(3)} />
        </div>
      </section>
    </main>
  );
}
