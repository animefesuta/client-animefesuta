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
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { FC } from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "../ui/button";
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
  const { userloginstate, login, logout } = useUserStore();

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
              onClick={login}
            >
              登录
            </Button>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>username</DropdownMenuLabel>
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
              <DropdownMenuSeparator />
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
                  {/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </DropdownMenuGroup>
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
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={logout}>退出登录</span>
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
          <SheetDescription>username</SheetDescription>
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
