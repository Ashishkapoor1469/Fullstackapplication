import { NavLink } from "react-router-dom";
import {
  Home,
  Search,
  Bell,
  User,
  LogOut,
  Presentation,
  MoreHorizontal,
} from "lucide-react";
import { useAuth } from "../../context/authContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navClass = ({ isActive }) =>
    `nav
     ${
       isActive
         ? "bg-neutral-900 text-[#1DA1F2]"
         : "text-gray-300 hover:bg-neutral-900 hover:text-white"
     }`;

  return (
    <aside className="hidden md:flex flex-col w-64 p-4 sticky top-0 h-screen">
      {/* Logo */}
      <div className="text-3xl font-bold mb-6">X</div>

      <NavLink to="/" end className={navClass}>
        <Home size={22} /> Home
      </NavLink>

      <NavLink to="/search" className={navClass}>
        <Search size={22} /> Search
      </NavLink>

      <NavLink to="/inbox" className={navClass}>
        <Bell size={22} /> Notifications
      </NavLink>

      <NavLink to="/profile" className={navClass}>
        <User size={22} /> Profile
      </NavLink>

      <NavLink to="/premium" className={navClass}>
        <Presentation size={22} /> Get Premium
      </NavLink>

      <NavLink to="/more" className={navClass}>
        <MoreHorizontal size={22} /> More
      </NavLink>

      {/* Logged-in user */}
      {user && (
        <div className="mt-auto flex items-center gap-3 p-3 hover:bg-neutral-900 rounded-full cursor-pointer">
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
