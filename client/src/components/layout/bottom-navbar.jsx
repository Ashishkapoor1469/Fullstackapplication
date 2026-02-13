// src/components/BottomNavbar.jsx
import { NavLink } from "react-router-dom";
import { Home, Search, User, Inbox, Diameter } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
export default function BottomNavbar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isPremium = location.pathname === "/premium";

  const navClass = ({ isActive }) =>
    isActive ? "text-[#1DA1F2]" : "text-gray-500";

  useEffect(() => {
    const handlescroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY.current);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handlescroll, { passive: true });
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);
  return (
    <>
      {!isPremium && (
        <button
          className={`md:hidden fixed bottom-19 right-6 bg-[#1DA1F2] p-3 rounded-full ${isVisible ? "translate-x-0" : "translate-x-96"} transform ease-in-out duration-300`}
        >
          <NavLink to="/premium">
            <Diameter />
          </NavLink>
        </button>
      )}

      <nav
        className={`md:hidden m-2 fixed bottom-0.5 shadow-2xl shadow-neutral-800 border rounded-full left-0 right-0 bg-black border-t border-gray-800 flex justify-around py-4 ${isVisible ? "translate-y-0" : "translate-y-96"} transform ease-in-out duration-300`}
      >
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
