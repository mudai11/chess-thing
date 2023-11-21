import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchivedGame from "@/components/ArchivedGame";
import { getGame } from "@/lib/game";

interface pageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: pageProps): Promise<Metadata> {
  const game = await getGame(id);
  if (!game) {
    return {
      description: "Game not found",
    };
  }
  return {
    title: `${game.white_player} vs ${game.black_player} | Chess Thing`,
    description: `Watch the game between ${game.white_player} and ${game.black_player}.`,
  };
}

export default async function ArchivedGamePage({ params: { id } }: pageProps) {
  const game = await getGame(id);
  if (!game) return notFound();

  return <ArchivedGame game={game} />;
}
