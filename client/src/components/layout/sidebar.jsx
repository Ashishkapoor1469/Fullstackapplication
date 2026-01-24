import { NavLink } from "react-router-dom";
import { Home, Search, Bell, User, LogOut, Presentation, MoreHorizontal } from "lucide-react";
import { useAuth } from "../../context/authContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 p-4 sticky top-0 h-screen">
      <div className="text-2xl font-bold mb-6">X</div>

      <NavLink to="/" className="nav">
        <Home /> Home
      </NavLink>

      <NavLink to="/search" className="nav">
        <Search /> Search
      </NavLink>

      <NavLink to="/inbox" className="nav">
        <Bell /> Notifications
      </NavLink>

      <NavLink to="/profile" className="nav">
        <User /> Profile
      </NavLink>
      <NavLink to="/premium" className="nav">
        <Presentation /> Get Primeum
      </NavLink>
      <NavLink to="/more" className="nav">
        <MoreHorizontal /> More
      </NavLink>

      {/* Logged-in user */}
      {user && (
        <div className="mt-auto flex items-center gap-3 p-3 hover:bg-gray-900 rounded-full cursor-pointer">
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-bold text-sm">{user.name}</p>
            <p className="text-gray-400 text-xs">@{user.username}</p>
          </div>
          <LogOut
            size={18}
            onClick={logout}
            className="cursor-pointer text-red-400"
          />
        </div>
      )}
    </aside>
  );
}
