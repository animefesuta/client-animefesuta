import axios from "axios";

type UserForm = {
  username: string;
  useremail: string;
  password: string;
  repassword?: string;
};

const signin = async (data: UserForm) => {
  const res = await axios.post("http://localhost:8080/api/v1/auth/signup", {
    nickname: data.username,
    email: data.useremail,
    password: data.password,
  });
  return res.data;
};

const login = async (data: Pick<UserForm, "useremail" | "password">) => {
  const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
    email: data.useremail,
    password: data.password,
  });
  return res.data;
};

const getUserInfo = async (email: string) => {
  const res = await axios.post(
    "http://localhost:8080/api/v1/fesuta/user/findUserByEmail",
    {
      email: email,
    }
  );
  return res.data;
};

export { signin, login, getUserInfo };
