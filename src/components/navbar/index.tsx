import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { useUserStore } from "@/store/userStore";

export default function Navbar() {
  const { pathname } = useLocation();
  const [links, setLinks] = useState([
    {
      name: "茵蒂克丝",
      _name: "Index",
      path: "/",
    },
    {
      name: "返图",
      _name: "Pics",
      path: "/picback",
    },
    {
      name: "直播",
      _name: "Live",
      path: "/live",
    },
    {
      name: "论坛",
      _name: "Posts",
      path: "/posts",
    },
  ]);

  useEffect(() => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => ({
        name: pathname === link.path ? link._name : link.name,
        _name: pathname === link.path ? link.name : link._name,
        path: link.path,
      }))
    );

    return () => {
      setLinks((prevLinks) =>
        prevLinks.map((link) => ({
          name: pathname === link.path ? link._name : link.name,
          _name: pathname === link.path ? link.name : link._name,
          path: link.path,
        }))
      );
    };
  }, [pathname]);

  const { userloginstate, login, logout } = useUserStore();

  return (
    <div className="gap-2 flex items-center bg-white px-20 shadow">
      {/* Nav left */}
      <div className="flex items-center ">
        {/* LOGO */}
        <div className="mr-5 my-2">
          <Link to="/">
            <div className="w-12 h-12 bg-cover bg-no-repeat bg-[url(/nav_logo.png)] hover:bg-[url(/txmascot.png)] cursor-pointer transform hover:scale-110 transition-all"></div>
          </Link>
        </div>

        {/* LINK */}
        {links.map((item) => {
          return (
            <Link key={item.name} to={item.path}>
              <Button
                variant="link"
                className={
                  clsx(
                    "text-lg min-w-[120px] text-gray-500 hover:no-underline hover:text-sky-500"
                  ) + (pathname === item.path ? " text-sky-500" : "")
                }
              >
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center flex-1 justify-end gap-5">
        {/* SEARCH */}
        <div className="w-[35%] flex items-center rounded overflow-hidden">
          <input
            type="text"
            placeholder="搜索展览、Coser、帖子..."
            className="bg-[#F2F7FA] h-[46px] w-full pl-3 outline-none border-0 placeholder:text-[#808080a6]"
          />
          <div className="bg-[#F2F7FA] h-[46px] w-[46px] pr-3 flex justify-center items-center">
            <FaSearch color="#808080a6" className="cursor-pointer" />
          </div>
        </div>

        {/* USER */}
        <div>
          {userloginstate ? (
            <div
              onClick={logout}
              className="transform hover:text-2xl transition-all cursor-pointer bg-gray-200 p-3 rounded-full"
            >
              <FaUser />
            </div>
          ) : (
            <div className="flex gap-5">
              <Button onClick={login}>登录</Button>
              <span className="bg-gray-500 w-[1px]"></span>
              <Button onClick={login}>注册</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
