import { FC } from "react";
import PlayersShowcase from "./PlayersShowcase";
import CopyLink from "./CopyLink";
import MoveList from "./MoveList";
import MoveNavigation from "./MoveNavigation";
import ChatLoading from "./Chat/ChatLoading";
import Overlay from "./Overlay";

interface GameLoadingProps {
  boardWidth: number;
  id: string;
}

const GameLoading: FC<GameLoadingProps> = ({ boardWidth, id }) => {
  return (
    <main className="flex w-full flex-wrap justify-center gap-6 px-4 py-10 lg:gap-10 2xl:gap-16">
      <section className="relative h-min">
        <Overlay />
        <div
          style={{
            width: boardWidth,
            height: boardWidth,
          }}
        />
      </section>
      <section className="flex max-w-lg min-w-[300px] flex-1 flex-col items-center justify-center gap-4">
        <PlayersShowcase />
        <CopyLink id={id} />
        <MoveList navIndex={null} navigateMove={() => {}} />
        <MoveNavigation navIndex={null} navigateMove={() => {}} />
        <ChatLoading />
      </section>
    </main>
  );
};

export default GameLoading;
