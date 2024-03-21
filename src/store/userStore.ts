import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getUserInfo, login, signin } from "@/api/user";
import { UserForm, UserInfo } from "./types";

interface UserState {
  userloginstate: boolean;
  userSignin: (data: UserForm) => Promise<boolean>;
  userLogin: (
    data: Pick<UserForm, "useremail" | "password">
  ) => Promise<boolean>;
  updateUserInfo: (userinfo: UserInfo) => void;
  userLogout: () => void;
  userToken: string;
  userInfo: UserInfo;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userloginstate: false,
      userSignin: async (dataForm): Promise<boolean> => {
        const { data } = await signin(dataForm);
        if (data) {
          return true;
        }
        return false;
      },
      userLogin: async (dataForm): Promise<boolean> => {
        const { data } = await login(dataForm);
        if (data) {
          getUserInfo(dataForm.useremail).then((res) => {
            set({ userInfo: res.data });
          });
          set({ userToken: data.token });
          set({ userloginstate: true });
          return true;
        }
        return false;
      },
      userLogout: () => {
        set({ userToken: "" });
        set({ userInfo: {} as UserInfo });
        set({ userloginstate: false });
      },
      updateUserInfo: (userinfo: UserInfo) => {
        set({ userInfo: userinfo });
      },
      userToken: "",
      userInfo: {} as UserInfo,
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
