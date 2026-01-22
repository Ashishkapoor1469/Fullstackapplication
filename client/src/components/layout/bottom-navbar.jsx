// src/components/BottomNavbar.jsx
import { NavLink } from "react-router-dom";
import { Home, Search, User, Plus, Inbox } from "lucide-react";

export default function BottomNavbar() {
  return (
    <>
      <button className="md:hidden fixed bottom-20 right-4 bg-[#1DA1F2] p-4 rounded-full">
        <Plus />
      </button>

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
