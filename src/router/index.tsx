import Home from "@/pages/Home";
import Index from "@/pages/Index";
import Live from "@/pages/Live";
import NoPage from "@/pages/NoPage";
import Pics from "@/pages/Pics";
import Posts from "@/pages/Posts";
import { createBrowserRouter } from "react-router-dom";

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
      },
      {
        path: "/live",
        element: <Live />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
    ],
  },
]);
