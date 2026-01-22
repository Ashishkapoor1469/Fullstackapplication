import Sidebar from "./sidebar";
import RightSidebar from "./rightsidenav";
import BottomNavbar from "./bottom-navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-[600px] border-x border-gray-800">
          <Outlet />
        </div>
      </main>

      <RightSidebar />
      <BottomNavbar />
    </div>
  );
}
