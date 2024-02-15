import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";
export default function Index() {
  return (
    <div
      style={{
        backgroundImage: "url(/web_bg.png)",
        backgroundSize: "15%",
      }}
      className="h-[100vh] gap-5"
    >
      <Navbar />
      <Outlet />
    </div>
  );
}
