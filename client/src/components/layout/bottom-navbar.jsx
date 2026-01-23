// src/components/BottomNavbar.jsx
import { NavLink } from "react-router-dom";
import { Home, Search, User, Inbox, Diamond } from "lucide-react";
import { useLocation } from "react-router-dom";
export default function BottomNavbar() {
  const location = useLocation();
  const isPremium = location.pathname === "/premium";
  return (
    <>
      {!isPremium && (
        <button className="md:hidden fixed bottom-20 right-4 bg-[#1DA1F2] p-4 rounded-full">
          <NavLink to="/premium">
            <Diamond />
          </NavLink>
        </button>
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-2">
        <NavLink to="/">
          <Home />
        </NavLink>
        <NavLink to="/search">
          <Search />
        </NavLink>
        <NavLink to="/profile">
          <User />
        </NavLink>
        <NavLink to="/inbox">
          <Inbox />
        </NavLink>
      </nav>
    </>
  );
}
