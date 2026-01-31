import { NavLink } from "react-router-dom";

export default function Edit() {
  return (
    <div className="flex gap-3 mt-3">
      <NavLink
        to="/edit"
        className="px-4 py-1.5 rounded-full border border-gray-700 text-sm font-bold hover:bg-gray-900"
      >
        Edit Profile
      </NavLink>
    </div>
  );
}
