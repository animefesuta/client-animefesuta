import { useLocation } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { PCNav } from "./PCNav";
import { FC } from "react";

const Navbar: FC = () => {
  const { pathname } = useLocation();
  const links = [
    {
      name: "首页",
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
  ];

  return (
    <>
      <div className="md:hidden my-1 flex">
        <MobileNav currentRoute={pathname} links={links} />
      </div>
      <div className="gap-2 hidden md:flex items-center bg-white px-20 shadow">
        <PCNav currentRoute={pathname} links={links} />
      </div>
    </>
  );
};

export { Navbar };
