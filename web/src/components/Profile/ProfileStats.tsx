import { Game } from "@/types/game";

type ProfileStatsProps = {
  games: Game[] | undefined;
  username: string;
};

export async function ProfileStats({ games, username }: ProfileStatsProps) {
  if (!games) return;

  const games_as_black = games.filter((game) => game.black_player === username);
  const games_as_white = games.filter((game) => game.white_player === username);

  return (
    <div className="flex flex-col items-center justify-center md:justify-start w-full md:w-[40%] gap-2 py-5">
      <div>Recent games (last 20 played)</div>
      <div className="flex flex-row gap-2 w-[200px] justify-start items-center">
        <span>games as:</span>
        <div className="rounded-sm w-[15px] h-[15px] border bg-white" />
        <span>{Math.round((games_as_white.length / games.length) * 100)}%</span>
      </div>
      <div className="flex flex-row gap-2 w-[200px] justify-start items-center">
        <span>games as:</span>
        <div className="rounded-sm w-[15px] h-[15px] border bg-black" />
        <span>{Math.round((games_as_black.length / games.length) * 100)}%</span>
      </div>
      <div className="flex flex-row gap-2 w-[200px] justify-start items-center">
        winrate:
        <div className="rounded-sm w-[15px] h-[15px] border bg-white" />
        <span>
          {Math.round(
            (games_as_white.filter((game) => game.winner === username).length /
              games.length) *
              100
          )}
          %
        </span>
        <div className="rounded-sm w-[15px] h-[15px] border bg-black" />
        <span>
          {Math.round(
            (games_as_black.filter((game) => game.winner === username).length /
              games.length) *
              100
          )}
          %
        </span>
      </div>
    </div>
  );
}
