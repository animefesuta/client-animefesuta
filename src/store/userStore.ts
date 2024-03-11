import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getUserInfo, login, signin } from "@/api/user";

type UserForm = {
  username: string;
  useremail: string;
  password: string;
  repassword?: string;
};

/* type TokenRES = {
  expiresIn: string;
  token: string;
}; */

type UserInfo = {
  avatar: string;
  createTime: string;
  creator: string;
  deleted: boolean;
  email: string;
  id: string;
  nickname: string;
  type: string;
  updateTime: string;
  updater: string;
};

interface UserState {
  userloginstate: boolean;
  userSignin: (data: UserForm) => Promise<boolean>;
  userLogin: (
    data: Pick<UserForm, "useremail" | "password">
  ) => Promise<boolean>;
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
      userToken: "",
      userInfo: {} as UserInfo,
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
