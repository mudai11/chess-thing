import { Game } from "@/types/game";
import { FC } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import type { Chess } from "chess.js";

interface EndStatsProps {
  game: Game;
  showPgn: boolean;
  setShowPgn: (arg: boolean) => void;
  currGame: Chess;
  navFen: string | null;
}

const EndStats: FC<EndStatsProps> = ({
  game,
  showPgn,
  setShowPgn,
  currGame,
  navFen,
}) => {
  return (
    <div className="relative h-60 w-full min-w-fit pt-5">
      <div className="flex h-full w-full min-w-[64px] flex-col">
        <span className="font-bold">
          {(game.end_reason === "BLACK_CHECKMATED" ||
            game.end_reason === "WHITE_CHECKMATED") &&
            `${game.winner} won by checkmate.`}
          {(game.end_reason === "BLACK_DISCONNECTED" ||
            game.end_reason === "WHITE_DISCONNECTED") &&
            `${game.winner} won by abandonment.`}
          {(game.end_reason === "BLACK_RESIGNED" ||
            game.end_reason === "WHITE_RESIGNED") &&
            `${game.winner} won by resignation.`}
          {game.end_reason === "DRAW" && `This game ended in a draw.`}
        </span>

        <div className="flex items-center justify-end gap-3 my-2">
          <Button variant="ghost" onClick={() => setShowPgn(true)}>
            Final PGN
          </Button>
          <div className="tooltip" data-tip="Current board position is shown.">
            <Button variant="ghost" onClick={() => setShowPgn(false)}>
              Current FEN
            </Button>
          </div>
        </div>
        <Textarea
          className="textarea h-full rounded-tr-none"
          readOnly
          value={showPgn ? game.pgn : navFen || currGame.fen()}
          onFocus={(e) => e.target.select()}
        />
      </div>
    </div>
  );
};

export default EndStats;
