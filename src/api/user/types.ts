import { UserInfo } from "@/store/types";

type UserResponse = {
  code: number;
  data: UserInfo;
  msg: string;
};

export type { UserResponse };
