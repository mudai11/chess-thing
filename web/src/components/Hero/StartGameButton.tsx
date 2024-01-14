import { Button } from "../ui/button";
import { Play } from "lucide-react";

const StartGameButton = () => {
  return (
      <Button variant="outline">
          <Play className="mr-1 h-4 w-4" />
          Start a game
      </Button>
  );
};

export default StartGameButton;
