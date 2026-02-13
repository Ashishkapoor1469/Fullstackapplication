// src/components/BottomNavbar.jsx
import { NavLink } from "react-router-dom";
import { Home, Search, User, Inbox, Diameter } from "lucide-react";
import { useLocation } from "react-router-dom";
export default function BottomNavbar() {
  const location = useLocation();
  const isPremium = location.pathname === "/premium";
  const navClass = ({ isActive }) =>
    isActive
      ? "text-[#1DA1F2]" 
      : "text-gray-500"; 
  return (
    <>
      {!isPremium && (
        <button className="md:hidden fixed bottom-19 right-6 bg-[#1DA1F2] p-3 rounded-full">
          <NavLink to="/premium">
            <Diameter />
          </NavLink>
        </button>
      )}

      <nav className="md:hidden m-2 fixed bottom-1 shadow-2xl shadow-neutral-900 border rounded-full left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-4">
        <NavLink to="/" className={navClass}>
          <Home />
        </NavLink>
        <NavLink to="/search" className={navClass}>
          <Search />
        </NavLink>
        <NavLink to="/profile" className={navClass}>
          <User />
        </NavLink>
        <NavLink to="/inbox" className={navClass}>
          <Inbox />
        </NavLink>
      </nav>
    </>
  );
}
