import { useLobbyStore } from "@/store/lobby-store";

const Overlay = () => {
  const lobby = useLobbyStore((state) => state.lobby);
  return (
    <>
      {(!lobby.white || !lobby.black) && (
        <div className="absolute bottom-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#4b7399] flex w-full items-center justify-center gap-4 px-2 py-4 text-white">
            Waiting for opponent.
          </div>
        </div>
      )}
      {lobby.end_reason && (
        <div className="absolute bottom-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#4b7399] flex w-full items-center justify-center gap-4 px-2 py-4 text-white">
            {lobby.end_reason === "BLACK_CHECKMATED"
              ? "White won by checkmate."
              : lobby.end_reason === "WHITE_CHECKMATED"
              ? "Black won by checkmate"
              : lobby.end_reason === "BLACK_DISCONNECTED"
              ? "White won, black abondoned."
              : lobby.end_reason === "WHITE_DISCONNECTED" &&
                "Black won, white abondoned."}
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;
