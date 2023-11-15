import { useLobbyStore } from "@/store/lobby-store";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { useState } from "react";

const Overlay = () => {
  const lobby = useLobbyStore((state) => state.lobby);
  const [open, setOpen] = useState(true);

  return (
    <>
      {lobby.side === "s" && (
        <div className="absolute bottom-0 right-0 top-0 z-10 flex h-full w-full items-center justify-cente">
          <div className="flex w-full items-center justify-center gap-4 px-2 py-4 text-white">
            Loading <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          </div>
        </div>
      )}
      {((!lobby.white && lobby.side !== "s") ||
        (!lobby.black && lobby.side !== "s")) && (
        <div className="absolute bottom-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#4b7399] flex w-full items-center justify-center gap-4 px-2 py-4 text-white">
            Waiting for opponent.
          </div>
        </div>
      )}
      {lobby.end_reason && open && (
        <div className="absolute bottom-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#4b7399] flex w-full items-center justify-center gap-1 px-2 py-4 text-white">
            {lobby.end_reason === "BLACK_CHECKMATED"
              ? "White won by checkmate."
              : lobby.end_reason === "WHITE_CHECKMATED"
              ? "Black won by checkmate."
              : lobby.end_reason === "BLACK_DISCONNECTED"
              ? "White won, black abondoned."
              : lobby.end_reason === "WHITE_DISCONNECTED" &&
                "Black won, white abondoned."}
            <Button variant="link" onClick={() => setOpen(false)}>
              Continue
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;
