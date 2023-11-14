import Game from "@/components/Game";
import { Metadata } from "next";

interface pageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Game | Chess Thing",
    description: "Play a game of chess.",
  };
}

export default async function GamePage({ params: { id } }: pageProps) {
  return <Game id={id} />;
}
