import { FC } from "react";
import { useLobbyStore } from "@/store/lobby-store";
import { useUserStore } from "@/store/user-store";
import PlayerShowcaseLoading from "./PlayerShowcaseLoading";
import WhiteSide from "./WhiteSide";
import BlackSide from "./BlackSide";

interface PlayersShowcaseProps {
  side: string;
}

const PlayerShowcase: FC<PlayersShowcaseProps> = ({ side }) => {
  const lobby = useLobbyStore((state) => state.lobby);
  const user = useUserStore((state) => state.user);

  if (lobby.side === "s") return <PlayerShowcaseLoading />;

  if (lobby.black === user?.username) {
    return side === "top" ? <WhiteSide /> : <BlackSide />;
  } else {
    return side === "top" ? <BlackSide /> : <WhiteSide />;
  }
};

export default PlayerShowcase;
