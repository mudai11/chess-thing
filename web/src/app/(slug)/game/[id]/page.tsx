import ChessboardComponent from "@/components/Chessboard";

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Game({ params: { id } }: pageProps) {
  return (
    <div className="w-screen pt-10 flex flex-col items-center justify-center">
      <ChessboardComponent id={id} />
    </div>
  );
}
