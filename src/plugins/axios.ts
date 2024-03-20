import axios from "axios";

// 创建一个axios实例，用于登录和注册请求
const loginRegisterInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

loginRegisterInstance.interceptors.request.use((config) => {
  if (config.url?.includes("/login") || config.url?.includes("signup")) {
    return config;
  }
  config.headers.Authorization = `Bearer ${
    JSON.parse(localStorage.getItem("userStore") ?? "").state.userToken
  }`;
  return config;
});
export default loginRegisterInstance;
