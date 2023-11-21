import { Game } from "@/types/game";
import { FC } from "react";

type Props = {
  game: Game;
};

const PlayersShowcase: FC<Props> = ({ game }) => {
  return (
    <div className="flex justify-between w-full p-2">
      <div className="flex flex-1 flex-row items-center justify-between">
        <div className="flex w-full flex-col justify-center">
          <a
            className="font-bold text-primary hover:underline"
            href={`/@${game.white_player}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {game.white_player}
          </a>
          <span className="flex items-center gap-1 text-xs">white</span>
        </div>
        <div className="my-auto w-full text-sm">vs</div>
        <div className="flex w-full flex-col justify-center">
          <a
            className="font-bold text-primary hover:underline"
            href={`/@${game.black_player}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {game.black_player}
          </a>
          <span className="flex items-center gap-1 text-xs">black</span>
        </div>
      </div>
    </div>
  );
};

export default PlayersShowcase;
