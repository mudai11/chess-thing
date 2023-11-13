import ChessboardComponent from "@/components/Game";
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

export default async function Game({ params: { id } }: pageProps) {
  return (
    <main className="w-screen pt-10 flex flex-col items-center justify-center">
      <ChessboardComponent id={id} />
    </main>
  );
}
