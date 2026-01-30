import {
  KeyRound,
  LogOut,
  Settings2,
  User2Icon,
  ChevronRight,
  Languages,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useTranslation } from "react-i18next";

const Item = ({ to, icon: Icon, label, color = "text-white" }) => (
  <NavLink
    to={to}
    className="flex items-center justify-between px-4 py-4 hover:bg-neutral-900 transition rounded-xl"
  >
    <div className={`flex items-center gap-4 ${color}`}>
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <ChevronRight size={18} className="text-neutral-500" />
  </NavLink>
);

export default function More() {
  const { logout } = useAuth();
 const { t } = useTranslation();
  return (
    <div className="w-full text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-black/60 border-b border-neutral-800 py-3 text-center text-lg font-bold">
        {t("settings.title")}
      </header>

      {/* Settings List */}
      <div className="mt-2 flex flex-col gap-1 px-2">
        <Item
          to="/login-history"
          icon={User2Icon}
          label={t("settings.loginHistory")}
        />

        <Item
          to="/nortification"
          icon={Settings2}
          label={t("settings.notifications")}
          color="text-green-500"
        />

        <Item
          to="/language"
          icon={Languages}
          label={t("settings.language")}
        />

        <Item
          to="/reset-pass"
          icon={KeyRound}
          label={t("settings.resetPassword")}
          color="text-orange-400"
        />

        {/* Divider */}
        <div className="h-px bg-neutral-800 my-2 mx-2" />

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center justify-between px-4 py-4 hover:bg-red-500/10 transition rounded-xl text-red-500 md:hidden"
        >
          <div className="flex items-center gap-4">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
}
