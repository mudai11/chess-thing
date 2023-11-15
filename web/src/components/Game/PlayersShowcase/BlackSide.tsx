import { Badge } from "@/components/ui/badge";
import { useLobbyStore } from "@/store/lobby-store";

const BlackSide = () => {
  const lobby = useLobbyStore((state) => state.lobby);
  return (
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
          <Badge variant={"destructive"}>disconnected</Badge>
        )}
      </span>
    </div>
  );
};

export default BlackSide;
