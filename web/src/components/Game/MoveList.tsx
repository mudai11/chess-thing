import { FC, useId } from "react";
import { useLobbyStore } from "@/store/lobby-store";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface MoveListProps {
  navIndex: number | null;
  navigateMove: (index: number | null | "prev") => void;
}

const MoveList: FC<MoveListProps> = ({ navIndex, navigateMove }) => {
  const lobby = useLobbyStore((state) => state.lobby);
  const history = lobby.game.history({ verbose: true });
  const movePairs = history
    .slice(history.length / 2)
    .map((_, i) => history.slice((i *= 2), i + 2));
  const id = useId();

  return (
    <div className="h-80 w-full overflow-y-scroll">
      <table className="table-compact table w-full">
        <tbody className="flex flex-col gap-[1px]">
          {movePairs.map((moves, i) => {
            return (
              <tr
                key={id + i}
                className="flex justify-around w-full items-center gap-1"
              >
                <td className="">{i + 1}.</td>
                <td
                  className={
                    cn(buttonVariants({ variant: "ghost" })) +
                    "h-full w-2/5 font-normal normal-case cursor-pointer" +
                    ((history.indexOf(moves[0]) === history.length - 1 &&
                      navIndex === null) ||
                    navIndex === history.indexOf(moves[0])
                      ? "pointer-events-none bg-accent text-accent-foreground select-none"
                      : "")
                  }
                  onClick={() => navigateMove(history.indexOf(moves[0]))}
                >
                  {moves[0].san}
                </td>
                {moves[1] ? (
                  <td
                    className={
                      cn(buttonVariants({ variant: "ghost" })) +
                      "h-full w-2/5 font-normal normal-case cursor-pointer" +
                      ((history.indexOf(moves[1]) === history.length - 1 &&
                        navIndex === null) ||
                      navIndex === history.indexOf(moves[1])
                        ? "pointer-events-none bg-accent text-accent-foreground select-none"
                        : "")
                    }
                    onClick={() => navigateMove(history.indexOf(moves[1]))}
                  >
                    {moves[1].san}
                  </td>
                ) : (
                  <td className="h-full w-2/5 font-normal normal-case cursor-pointer pointer-events-noneselect-none"></td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MoveList;
