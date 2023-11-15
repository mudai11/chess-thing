import { Badge } from "@/components/ui/badge";
import { useLobbyStore } from "@/store/lobby-store";

const WhiteSide = () => {
  const lobby = useLobbyStore((state) => state.lobby);
  return (
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
          <Badge variant={"destructive"}>disconnected</Badge>
        )}
      </span>
    </div>
  );
};

export default WhiteSide;
