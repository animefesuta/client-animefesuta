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
import { Cloud, CreditCard, LifeBuoy, LogOut, User } from "lucide-react";
import { UserSign } from "../user/UserSign";

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
  const [signUserOpen, setSignUserOpen] = useState(false);
  const [signType, setSignType] = useState(0);
  const [signUserOpenTitle, setSignUserOpenTitle] = useState("");
  const navigate = useNavigate();
  console.log(userInfo);

  const signMerchant = () => {
    setSignType(0);
    setSignUserOpenTitle("申请成为商家");
    setSignUserOpen(true);
  };
  const signCoser = () => {
    setSignType(1);
    setSignUserOpenTitle("申请成为Coser");
    setSignUserOpen(true);
  };

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
          if (
            (item.name === "返图" ||
              item.name === "直播" ||
              item.name === "论坛") &&
            userloginstate === false
          )
            return null;
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
                  {userInfo.avatar ? (
                    <div
                      style={{
                        backgroundImage: `url(${
                          import.meta.env.VITE_MINIO_ENDPOINT
                        }/images${userInfo.avatar})`,
                      }}
                      className="w-10 h-10 bg-cover bg-center rounded-full cursor-pointer"
                    ></div>
                  ) : (
                    <FaUser className="cursor-pointer bg-gray-200 flex justify-center items-center w-10 h-10 p-2 rounded-full" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>{userInfo.nickname}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/user")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>个人空间</span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => navigate("/")}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>订单</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  {userInfo.type && userInfo.type.toString() === "40" && (
                    <>
                      <DropdownMenuItem onClick={() => signMerchant()}>
                        商家认证
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signCoser()}>
                        Coser认证
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem onClick={() => navigate("/")}>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>服务支持</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/")} disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                    <AlertDialog>
                      <AlertDialogTrigger className="flex justify-center items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>退出登录</span>
                      </AlertDialogTrigger>
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
      <AlertDialog open={signUserOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>{signUserOpenTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            <UserSign openDialog={setSignUserOpen} signType={signType} />
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { PCNav };
