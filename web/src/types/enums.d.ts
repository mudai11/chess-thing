namespace $Enums {
  export const EndReason: {
    WHITE_RESIGNED: "WHITE_RESIGNED";
    BLACK_RESIGNED: "BLACK_RESIGNED";
    WHITE_DISCONNECTED: "WHITE_DISCONNECTED";
    BLACK_DISCONNECTED: "BLACK_DISCONNECTED";
    WHITE_CHECKMATED: "WHITE_CHECKMATED";
    BLACK_CHECKMATED: "BLACK_CHECKMATED";
    DRAW: "DRAW";
  };

  export type EndReason = (typeof EndReason)[keyof typeof EndReason];
}
