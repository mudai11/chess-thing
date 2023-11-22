import { Game } from "@/types/game";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Link from "next/link";

type ProfileGamesProps = {
  games: Game[] | undefined;
  username: string;
};

export async function ProfileGames({ games, username }: ProfileGamesProps) {
  if (!games)
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <span>No games played yet.</span>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-[600px] md:h-[600px] md:overflow-y-scroll">
      {games.map((game, index) => {
        const date = new Date(game.date);
        let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
          date
        );
        let month = new Intl.DateTimeFormat("en", { month: "short" }).format(
          date
        );
        let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
          date
        );
        if (game.end_reason) {
          return (
            <Link
              key={game.id}
              className={`flex flex-wrap py-3 pr-1 gap-3 items-center justify-center w-full lg:min-w-[400px] xl:min-w-[500px] min-h-[100px] ${
                games.length != index + 1 && "border-b"
              }  cursor-pointer hover:border-l-4 hover:border-l-primary hover:border-t-[1px] hover:border-t-primary hover:border-b-[1px] hover:border-b-primary`}
              href={`/archive/${game.id}`}
            >
              <div className="flex flex-col items-start justify-center gap-2 px-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="rounded-sm w-[15px] h-[15px] border bg-white" />
                  <span
                    className={
                      game.white_player === username
                        ? "font-bold underline"
                        : ""
                    }
                  >
                    {game.white_player}
                  </span>
                  {game.winner === game.white_player && (
                    <Badge className="text-[10px] hover:bg-primary">
                      winner
                    </Badge>
                  )}
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="rounded-sm w-[15px] h-[15px] border bg-black" />
                  <span
                    className={
                      game.black_player === username
                        ? "font-bold underline"
                        : ""
                    }
                  >
                    {game.black_player}
                  </span>
                  {game.winner === game.black_player && (
                    <Badge className="text-[10px] hover:bg-primary">
                      winner
                    </Badge>
                  )}
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-[10px]">{game.end_reason}</div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-[10px]">{`${month} ${day}, ${year}.`}</div>
            </Link>
          );
        } else {
          return (
            <Link
              key={game.id}
              className={`flex flex-wrap py-3 pr-1 gap-3 items-center justify-center w-full lg:min-w-[400px] xl:min-w-[500px] min-h-[100px] ${
                games.length != index + 1 && "border-b"
              }  cursor-pointer hover:border-l-4 hover:border-l-primary hover:border-t-[1px] hover:border-t-primary hover:border-b-[1px] hover:border-b-primary`}
              href={`/game/${game.id}`}
            >
              <div className="flex flex-col items-start justify-center gap-2 px-3">
                <div className="flex justify-center items-center gap-2">
                  <div className="rounded-sm w-[15px] h-[15px] border bg-white" />
                  <span
                    className={
                      game.white_player === username
                        ? "font-bold underline"
                        : ""
                    }
                  >
                    {game.white_player ? game.white_player : "(none)"}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="rounded-sm w-[15px] h-[15px] border bg-black" />
                  <span
                    className={
                      game.black_player === username
                        ? "font-bold underline"
                        : ""
                    }
                  >
                    {game.black_player ? game.black_player : "(none)"}
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-[10px]">CURRENTLY_IN_GAME</div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-[10px]">
                {(game.white_player && !game.black_player) ||
                (game.black_player && !game.white_player)
                  ? "PLAY ?"
                  : "WATCH ?"}
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
}
