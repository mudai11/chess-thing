import { Button } from "../ui/button";
import { Play } from "lucide-react";

const StartGameButton = () => {
  return (
      <Button className="relative mx-auto w-fit overflow-hidden rounded-md p-[1px] font-bold md:mr-0 lg:mr-auto">
        <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-md px-4 py-2 text-md bg-background hover:bg-primary-foreground dark:bg-background dark:hover:bg-primary-foreground text-black dark:text-white">
          <Play className="mr-1 h-4 w-4" />
          Start a game
        </span>
      </Button>
  );
};

export default StartGameButton;
