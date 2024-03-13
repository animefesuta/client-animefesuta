import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { useUserStore } from "@/store/userStore";
import { FC, useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SignIn } from "../user/SignIn";
import { LogIn } from "../user/LogIn";

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
  const { userloginstate, userLogout, userInfo } = useUserStore();
  const [logInOpen, setLogInOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    userLogout();
    navigate("/");
  }, [navigate, userLogout]);

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
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FaUser className="cursor-pointer bg-gray-200 flex justify-center items-center w-10 h-10 p-2 rounded-full" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{userInfo.nickname}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/user")}>
                    个人空间
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/user")}>
                    我的作品
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    <AlertDialog>
                      <AlertDialogTrigger>退出登录</AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>退出登录?</AlertDialogTitle>
                          <AlertDialogDescription>
                            退出登录将会清除您未保存的内容并回到首页
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction onClick={() => logOut()}>
                            继续
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-5">
              <Button onClick={() => setLogInOpen(true)}>登录</Button>
              <span className="bg-gray-500 w-[1px]"></span>
              <Button onClick={() => setSignInOpen(true)}>注册</Button>
            </div>
          )}
        </div>
      </div>
      <AlertDialog open={logInOpen}>
        <AlertDialogContent>
          <AlertDialogDescription>
            <LogIn openDialog={setLogInOpen} />
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={signInOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>AnimeFusta 新建用户</AlertDialogTitle>
          <AlertDialogDescription>
            <SignIn
              openDialog={setSignInOpen}
              openLogin={() => setLogInOpen(true)}
            />
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { PCNav };
