import Sidebar from "./sidebar";
import RightSidebar from "./rightsidenav";
import BottomNavbar from "./bottom-navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-black text-white min-h-screen flex selection:text-pretty selection:bg-orange-400/20">
      <Sidebar />

      <main className="flex-1 flex justify-center overflow-hidden">
        <div className="w-full max-w-160 border-x border-neutral-800">
          <Outlet />
        </div>
      </main>

      <RightSidebar />
      <BottomNavbar />
    </div>
  );
}
