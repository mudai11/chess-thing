import { FC } from "react";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";

interface FlipBoardProps {
  setFlipBoard: (arg: boolean) => void;
  flipBoard: boolean;
}

const FlipBoard: FC<FlipBoardProps> = ({ flipBoard, setFlipBoard }) => {
  return (
    <div className="flex w-full items-center justify-start">
      <Button
        variant="ghost"
        className="flex flex-row justify-center items-center p-3 gap-1 h-8 text-xs sm:h-5 sm:text-sm"
        onClick={() => setFlipBoard(!flipBoard)}
      >
        <RotateCw size={16} />
        Flip board
      </Button>
    </div>
  );
};

export default FlipBoard;
