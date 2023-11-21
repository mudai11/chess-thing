import { FC } from "react";
import { useLobbyStore } from "@/store/lobby-store";
import { useUserStore } from "@/store/user-store";
import PlayerShowcaseLoading from "./PlayerShowcaseLoading";
import Side from "./Side";

interface PlayersShowcaseProps {
  side: string;
}

const PlayerShowcase: FC<PlayersShowcaseProps> = ({ side }) => {
  const lobby = useLobbyStore((state) => state.lobby);
  const user = useUserStore((state) => state.user);

  if (lobby.side === "s" || !user) return <PlayerShowcaseLoading />;

  if (lobby.black === user.username) {
    return side === "left" ? <Side side="black" /> : <Side side="white" />;
  } else {
    return side === "left" ? <Side side="white" /> : <Side side="black" />;
  }
};

export default PlayerShowcase;
