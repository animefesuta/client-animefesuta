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
  uid: string;
  nickname: string;
  instruction: string;
  type: string;
  updateTime: string;
  updater: string;
  backgroundImage: string;
};

export type { UserForm, UserInfo };
