import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { useUserStore } from "@/store/userStore";
import { FC } from "react";

interface Link {
  name: string;
  _name: string;
  path: string;
}

interface NavProps {
  currentRoute: string;
  links: Link[];
}

const PCNav: FC<NavProps> = ({ currentRoute, links }) => {
  const { userloginstate, login, logout } = useUserStore();

  return (
    <>
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
          if (item.name === "返图" && userloginstate === false) return null;
          return (
            <Link key={item.name} to={item.path}>
              <Button
                variant="link"
                className={
                  clsx(
                    "text-lg min-w-[120px] text-gray-500 hover:no-underline hover:text-sky-500"
                  ) + (currentRoute === item.path ? " text-sky-500" : "")
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
            className="hidden lg:block bg-[#F2F7FA] h-[46px] w-full pl-3 outline-none border-0 placeholder:text-[#808080a6]"
          />
          <div className="bg-[#F2F7FA] h-[46px] w-[46px] px-3 flex justify-center items-center">
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
    </>
  );
};

export { PCNav };
