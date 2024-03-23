import axios from "@/plugins/axios";
import { UserInfo } from "@/store/types";
import { UserResponse } from "./types";

type UserForm = {
  username: string;
  useremail: string;
  password: string;
  repassword?: string;
};

const signin = async (data: UserForm) => {
  const res = await axios.post("/api/v1/auth/signup", {
    nickname: data.username,
    email: data.useremail,
    password: data.password,
  });
  return res.data;
};

const login = async (data: Pick<UserForm, "useremail" | "password">) => {
  const res = await axios.post("/api/v1/auth/login", {
    email: data.useremail,
    password: data.password,
  });
  return res.data;
};

const getUserInfo = async (email: string) => {
  const res = await axios.post("/api/v1/fesuta/user/findUserByEmail", {
    email: email,
  });
  return res.data;
};

const updateUserAvatar = async (
  userInfo: Partial<UserInfo>
): Promise<UserInfo> => {
  const res = await axios.post("/api/v1/fesuta/user/updateAvatar", userInfo);
  return res.data.data;
};

const updateUserInstruction = async (
  userInfo: Partial<UserInfo>
): Promise<UserResponse> => {
  const res = await axios.post(
    "/api/v1/fesuta/user/updateInstruction",
    userInfo
  );
  return res.data;
};

const updateUserNickName = async (
  userInfo: Partial<UserInfo>
): Promise<UserResponse> => {
  const res = await axios.post("/api/v1/fesuta/user/updateNickName", userInfo);
  return res.data;
};

const updateUserBackground = async (
  userInfo: Partial<UserInfo>
): Promise<UserResponse> => {
  const res = await axios.post(
    "/api/v1/fesuta/user/updateBackground",
    userInfo
  );
  return res.data;
};

const updateUserEmail = async (userInfo: Partial<UserInfo>): Promise<void> => {
  return await axios.post("/api/v1/fesuta/user/updateEmail", userInfo);
};

export {
  signin,
  login,
  getUserInfo,
  updateUserAvatar,
  updateUserInstruction,
  updateUserNickName,
  updateUserBackground,
  updateUserEmail,
};
