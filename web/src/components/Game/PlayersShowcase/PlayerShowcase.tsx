import { FC } from "react";
import { useLobbyStore } from "@/store/lobby-store";
import { useUserStore } from "@/store/user-store";

interface PlayersShowcaseProps {
  side: string;
}

const PlayerShowcase: FC<PlayersShowcaseProps> = ({ side }) => {
  const lobby = useLobbyStore((state) => state.lobby);
  const user = useUserStore((state) => state.user);
  const blackHtml = (
    <div className="flex w-full flex-col justify-center">
      <a
        className={
          (lobby.black ? "font-bold" : "") + " text-primary link-hover"
        }
        href={`/@${lobby.black}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {lobby.black || "(no one)"}
      </a>
      <span className="flex items-center gap-1 text-xs">
        black
        {lobby.black_connected === false && (
          <span className="badge badge-xs badge-error">disconnected</span>
        )}
      </span>
    </div>
  );
  const whiteHtml = (
    <div className="flex w-full flex-col justify-center">
      <a
        className={
          (lobby.white ? "font-bold" : "") + " text-primary link-hover"
        }
        href={`/@${lobby.white}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {lobby.white || "(no one)"}
      </a>
      <span className="flex items-center gap-1 text-xs">
        white
        {lobby.white_connected === false && (
          <span className="badge badge-xs badge-error">disconnected</span>
        )}
      </span>
    </div>
  );

  if (lobby.black === user?.username) {
    return side === "top" ? whiteHtml : blackHtml;
  } else {
    return side === "top" ? blackHtml : whiteHtml;
  }
};

export default PlayerShowcase;
