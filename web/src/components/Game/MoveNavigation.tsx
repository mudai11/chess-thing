import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from "lucide-react";
import { useLobbyStore } from "@/store/lobby-store";
import { FC } from "react";
import { Button } from "../ui/button";

interface MoveNavigationProps {
  navIndex: number | null;
  navigateMove: (index: number | null | "prev") => void;
}

const MoveNavigation: FC<MoveNavigationProps> = ({
  navIndex,
  navigateMove,
}) => {
  const lobby = useLobbyStore((state) => state.lobby);
  return (
    <div className="flex h-4 w-full">
      <Button
        className="flex-grow rounded-r-none"
        disabled={navIndex === 0 || lobby.game.history().length <= 1}
        variant={"outline"}
        onClick={() => navigateMove(0)}
      >
        <SkipBack size={18} />
      </Button>
      <Button
        className="flex-grow rounded-none"
        variant={"outline"}
        disabled={navIndex === 0 || lobby.game.history().length <= 1}
        onClick={() => navigateMove(navIndex === null ? "prev" : navIndex - 1)}
      >
        <ChevronLeft size={18} />
      </Button>
      <Button
        className="flex-grow rounded-none"
        disabled={navIndex === null}
        variant={"outline"}
        onClick={() => navigateMove(navIndex === null ? null : navIndex + 1)}
      >
        <ChevronRight size={18} />
      </Button>
      <Button
        className="flex-grow rounded-l-none"
        disabled={navIndex === null}
        variant={"outline"}
        onClick={() => navigateMove(null)}
      >
        <SkipForward size={18} />
      </Button>
    </div>
  );
};

export default MoveNavigation;
