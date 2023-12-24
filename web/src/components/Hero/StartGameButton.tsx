import { Button } from "../ui/button";
import { Play } from "lucide-react";

const StartGameButton = () => {
  return (
    <>
      <Button className="relative bg-[#4b7399] hover:bg-[#4b7399] w-fit overflow-hidden rounded-md p-[2px] font-bold dark:hidden md:mr-0 lg:mr-auto">
        <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-[10px] bg-white px-4 py-2 text-md text-[#4b7399]">
          <Play className="mr-1 h-5 w-5" />
          Start a game
        </span>
      </Button>
      <Button className="relative mx-auto hidden w-fit overflow-hidden rounded-md p-[1px] font-bold dark:block md:mr-0 lg:mr-auto">
        <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-md px-4 py-2 text-md dark:bg-background hover:bg-primary dark:text-white">
          <Play className="mr-1 h-4 w-4" />
          Start a game
        </span>
      </Button>
    </>
  );
};

export default StartGameButton;
