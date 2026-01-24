import { NavLink } from "react-router-dom";
export default function More() {
  return (
    <>
      <header className=" sticky top-0 h-10 border-b mb-2 text-xl text-center w-full font-bold">
        Settings
      </header>
      <div className="w-full p-3 grid md:grid-cols-2 gap-2 text-white">
        <NavLink
          className={
            "w-full h-15 rounded-2xl flex gap-3 p-4 border border-neutral-800 hover:bg-neutral-900 transition cursor-pointer"
          }
          to="/login-history"
        >
          Login history
        </NavLink>
        <NavLink
          className={
            "w-full h-15 rounded-2xl flex gap-3 p-4 border border-neutral-800 hover:bg-neutral-900 transition cursor-pointer"
          }
          to="/login-history"
        >
          Login history
        </NavLink>
      </div>
    </>
  );
}
