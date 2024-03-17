import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cloud,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "../ui/button";
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
} from "../ui/alert-dialog";
import { LogIn } from "../user/LogIn";
import { SignIn } from "../user/SignIn";
interface Link {
  name: string;
  _name: string;
  path: string;
}

interface NavProps {
  currentRoute: string;
  links: Link[];
}

const MobileNav: FC<NavProps> = ({ currentRoute, links }) => {
  const { userloginstate, userLogout, userInfo } = useUserStore();
  const [logInOpen, setLogInOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    userLogout();
    navigate("/");
  }, [navigate, userLogout]);

  return (
    <Sheet>
      <div className="flex my-1 mx-2 items-center justify-between w-full">
        <SheetTrigger>
          <HiOutlineMenuAlt2 size={24} />
        </SheetTrigger>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className={clsx(userloginstate ? "" : "hidden")}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <Button
              className={clsx(userloginstate ? "hidden" : "")}
              onClick={() => setLogInOpen(true)}
            >
              登录
            </Button>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{userInfo.nickname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>个人中心</span>
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>订单</span>
                  {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>设置</span>
                  {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              {/* <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>我的团队</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>邀请用户</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>邮件</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>短信</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>其他...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>新建团队</span>
                </DropdownMenuItem>
              </DropdownMenuGroup> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>商家认证</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Coser认证</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LifeBuoy className="mr-2 h-4 w-4" />
                <span>服务支持</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud className="mr-2 h-4 w-4" />
                <span>API</span>
              </DropdownMenuItem>
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

      <SheetContent side={"left"}>
        <SheetHeader className={clsx(userloginstate ? "" : "hidden")}>
          <SheetTitle className="flex justify-center items-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                <Skeleton className="w-full h-full rounded-full" />
              </AvatarFallback>
            </Avatar>
          </SheetTitle>
          <SheetDescription>{userInfo.nickname}</SheetDescription>
        </SheetHeader>
        <div>
          <div className="flex items-center rounded overflow-hidden py-3">
            <input
              type="text"
              placeholder="搜索展览、Coser、帖子..."
              className="bg-[#F2F7FA] h-[46px] w-full pl-3 outline-none border-0 placeholder:text-[#808080a6]"
            />
            <div className="bg-[#F2F7FA] h-[46px] w-[46px] px-3 flex justify-center items-center">
              <FaSearch color="#808080a6" className="cursor-pointer" />
            </div>
          </div>
          {/* LINK */}
          {links.map((item) => {
            if (item.name === "返图" && userloginstate === false) return null;
            return (
              <div key={item.path}>
                <Separator />
                <Link key={item.name} to={item.path}>
                  <SheetClose className="w-full flex justify-end my-3">
                    <div
                      className={
                        clsx(
                          " text-lg font-bold  text-gray-500 hover:text-sky-500"
                        ) + (currentRoute === item.path ? " text-sky-500" : "")
                      }
                    >
                      {item.name}
                    </div>
                  </SheetClose>
                </Link>
                <Separator />
              </div>
            );
          })}
        </div>
        {/* 网站备案信息 */}
        {/* <SheetFooter></SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export { MobileNav };
