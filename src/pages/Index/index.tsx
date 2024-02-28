import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";
export default function Index() {
  return (
    <div
      style={{
        backgroundColor: "#F8F8F8",
        backgroundImage: "url(/web_bg.png)",
        backgroundSize: "15%",
      }}
      className="gap-5 h-[100%]"
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
