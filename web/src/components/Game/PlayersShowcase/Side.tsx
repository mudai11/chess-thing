import { Badge } from "@/components/ui/badge";
import { useLobbyStore } from "@/store/lobby-store";
import { FC } from "react";

type SideProps = {
  side: "white" | "black";
};

const Side: FC<SideProps> = ({ side }) => {
  const lobby = useLobbyStore((state) => state.lobby);

  if (
    (side === "white" && !lobby.white) ||
    (side === "black" && !lobby.black)
  ) {
    return (
      <div className="flex w-full flex-col justify-center">
        <span className="text-primary">(none)</span>
        <span className="flex items-center gap-1 text-xs">
          {side === "white" ? "white" : "black"}
        </span>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <a
        className="font-bold text-primary hover:underline"
        href={
          side === "white" && lobby.white
            ? `/@${lobby.white}`
            : `/@${lobby.black}`
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        {side === "white" ? lobby.white : lobby.black}
      </a>
      <span className="flex items-center gap-1 text-xs">
        {side === "white" ? "white" : "black"}
        {(lobby.black_connected === false && side === "black") ||
          (lobby.white_connected === false && side === "white" && (
            <Badge variant={"destructive"}>disconnected</Badge>
          ))}
      </span>
    </div>
  );
};

export default Side;
