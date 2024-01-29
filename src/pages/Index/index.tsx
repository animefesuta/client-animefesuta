import { Button } from "@/components/ui/button";
import { Outlet, Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="gap-5">
      <div className="flex gap-2">
        <Button>
          <Link to={"/"}>首页</Link>
        </Button>
        <Button>
          <Link to={"/picback"}>返图</Link>
        </Button>
        <Button>
          <Link to={"/live"}>直播</Link>
        </Button>
        <Button>
          <Link to={"/posts"}>论坛</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}
