import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserForm = {
  username: string;
  password: string;
  repassword?: string;
};

interface UserState {
  userloginstate: boolean;
  signin: (data: UserForm) => boolean;
  login: (data: UserForm) => boolean;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userloginstate: false,
      signin: (data): boolean => {
        console.log(data);
        return true;
      },
      login: (data): boolean => {
        console.log(data);
        // set({ userloginstate: true });
        return true;
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
