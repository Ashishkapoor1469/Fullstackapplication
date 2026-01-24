import { LogOut, Settings2, User2Icon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
export default function More() {
  const { logout } = useAuth();

  return (
    <>
      <header className=" sticky backdrop-blur-3xl top-0 h-10 border-b mb-2 text-xl text-center w-full font-bold">
        Settings
      </header>

      <div className="w-full p-3 grid md:grid-cols-2 gap-2 text-white">
        <NavLink
          className={
            "w-full h-15 rounded-2xl flex gap-3 p-4 border border-neutral-800 hover:bg-neutral-900 transition cursor-pointer"
          }
          to="/login-history"
        >
          <User2Icon /> Login history
        </NavLink>
        <NavLink
          className={
            "w-full h-15 rounded-2xl flex gap-3 p-4 border border-neutral-800 hover:bg-neutral-900 transition cursor-pointer"
          }
          to="/nortification"
        >
          <Settings2 /> Nortifications
        </NavLink>
        <button
          className={
            "w-full h-15 md:hidden rounded-2xl flex gap-3 p-4 border border-neutral-800  text-red-700 transition cursor-pointer"
          }
          onClick={logout}
        >
          <LogOut /> Logout
        </button>
      </div>
    </>
  );
}
