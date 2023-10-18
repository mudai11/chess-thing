import { Button } from "../ui/button";
import { Play } from "lucide-react";

const StartGameButton = () => {
  return (
    <>
      <Button
        asChild
        className="hero-play-button group relative w-fit overflow-hidden rounded-xl p-[2px] font-bold transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_2rem_-0.5rem_#f59e0b] dark:hidden md:mr-0 lg:mr-auto"
      >
        <div className="cursor-pointer">
          <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-[10px] bg-white px-4 py-2 text-md text-amber-500 transition-all duration-300">
            <Play className="mr-1 h-5 w-5" />
            Start a game
          </span>
        </div>
      </Button>
      <Button
        asChild
        className="hero-play-button-dark group relative mx-auto hidden w-fit overflow-hidden rounded-xl p-[1px] font-bold transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8] md:mr-0 lg:mr-auto"
      >
        <div className="cursor-pointer">
          <span className="lg:inline-flex h-full flex items-center justify-center w-[250px] lg:w-fit gap-1 rounded-xl px-4 py-2 text-md transition-all duration-300 dark:bg-neutral-900 dark:text-white group-hover:dark:bg-black">
            <Play className="mr-1 h-4 w-4" />
            Start a game
          </span>
        </div>
      </Button>
    </>
  );
};

export default StartGameButton;