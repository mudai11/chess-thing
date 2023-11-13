import { create } from "zustand";
import { User } from "@/../../server/src/types";

type userStorState = {
  user: User | null;
};

type userStorAction = {
  setUser: (user: userStorState["user"]) => void;
  clearUser: () => void;
};

const useUserStore = create<userStorState & userStorAction>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  clearUser: () => set(() => ({ user: null }), true),
}));

export { useUserStore };
