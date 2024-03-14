import Home from "@/pages/Home";
import Index from "@/pages/Index";
import Live from "@/pages/Live";
import NoPage from "@/pages/NoPage";
import Pics from "@/pages/Pics";
import Posts from "@/pages/Posts";
import User from "@/pages/User";
import { createBrowserRouter, redirect } from "react-router-dom";

/**
 * @description 路由权限控制
 * @description (取代请求拦截器中的登陆重定向)
 */
const rootLoader = async () => {
  const userStore = localStorage.getItem("userStore");
  if (userStore) {
    const { userInfo, userloginstate, userToken } = JSON.parse(userStore).state;
    if (userInfo && userloginstate && userToken) {
      return { userInfo, userloginstate, userToken };
    }
    return redirect("/");
  } else {
    return redirect("/");
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NoPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/picback",
        element: <Pics />,
        loader: rootLoader,
      },
      {
        path: "/live",
        element: <Live />,
        loader: rootLoader,
      },
      {
        path: "/posts",
        element: <Posts />,
        loader: rootLoader,
      },
      {
        path: "/user",
        element: <User />,
        children: [
          {
            path: ":username",
            element: <User />,
          },
          {
            path: "workspace",
            element: <User />,
          },
        ],
        loader: rootLoader,
      },
    ],
  },
]);
