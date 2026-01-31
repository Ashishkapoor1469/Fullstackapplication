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
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const navClass = ({ isActive }) =>
    `nav flex items-center gap-4 px-4 py-3 rounded-full transition
     ${
       isActive
         ? "bg-neutral-900 text-[#1DA1F2]"
         : "text-gray-300 hover:bg-neutral-900 hover:text-white"
     }`;

  return (
    <aside className="hidden md:flex flex-col w-64 p-4 sticky top-0 h-screen">
      {/* Logo */}
      <div className="text-3xl font-bold mb-6 px-4">X</div>

      <NavLink to="/" end className={navClass}>
        <Home size={22} />
        <span className="text-lg">{t("sidebar.home")}</span>
      </NavLink>

      <NavLink to="/search" className={navClass}>
        <Search size={22} />
        <span className="text-lg">{t("sidebar.explore")}</span>
      </NavLink>

      <NavLink to="/inbox" className={navClass}>
        <Bell size={22} />
        <span className="text-lg">{t("sidebar.notifications")}</span>
      </NavLink>

      <NavLink to="/profile" className={navClass}>
        <User size={22} />
        <span className="text-lg">{t("sidebar.profile")}</span>
      </NavLink>

      <NavLink to="/premium" className={navClass}>
        <Presentation size={22} />
        <span className="text-lg">{t("sidebar.premium")}</span>
      </NavLink>

      <NavLink to="/more" className={navClass}>
        <MoreHorizontal size={22} />
        <span className="text-lg">{t("sidebar.more")}</span>
      </NavLink>

      {/* Logged-in user */}
      {user && (
        <div className="mt-auto flex items-center gap-3 p-3 hover:bg-neutral-900 rounded-full cursor-pointer transition">
          <img
            src={user.avatar.url || user.avatar}
            loading="lazy"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-bold text-sm">{user.name}</p>
            <p className="text-gray-400 text-xs">@{user.username}</p>
          </div>
          <LogOut
            size={18}
            onClick={logout}
            className="cursor-pointer text-red-400 hover:text-red-500"
          />
        </div>
      )}
    </aside>
  );
}
