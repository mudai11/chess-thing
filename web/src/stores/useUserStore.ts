import { create } from "zustand";

interface UserStore {
  user: any | null;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: any) => set({ user: user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
