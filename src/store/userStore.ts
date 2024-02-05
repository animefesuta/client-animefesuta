import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  userloginstate: boolean;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userloginstate: false,
      login: () => {
        set({ userloginstate: true });
      },
      logout: () => {
        set({ userloginstate: false });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
