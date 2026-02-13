import { useAuth } from "../../context/authContext";
import { PostUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { useState } from "react";
import { Bell, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Nortify() {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
   const navigate = useNavigate();
  const toggleNotifications = async () => {
    if (loading) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        showToast("Please enable browser notifications", "info");
        return;
      }

      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await PostUser("toggle-notifications", {}, token);

      if (!res.success) {
        showToast(res.message || "Failed to update settings", "error");
        return;
      }

      setUser((prev) => ({
        ...prev,
        notificationsEnabled: res.enabled,
      }));

      showToast(res.message, "success");
    } catch (error) {
      console.error("Notification toggle error:", error);
      showToast("Something went wrong. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // if (!user) return null;

  return (
    <div className="max-w-xl mx-auto text-white">
      {/* Header */}
      <header className="sticky flex gap-2 top-0 z-10 bg-black/70 backdrop-blur border-b border-neutral-800 px-4 py-3">
       <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
       <div>
         <h1 className="text-lg font-bold">{t("notifications.title")}</h1>
        <p className="text-xs text-gray-400">
          Control how you receive alerts
        </p>
       </div>
      </header>

      {/* Content */}
      <div className="p-4">
        <div className="border border-neutral-800 rounded-2xl p-4 hover:bg-neutral-900 transition">
          <div className="flex items-center justify-between gap-4">
            {/* Left */}
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2]">
                <Bell size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-sm">
                  Browser notifications
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Get notified when something important happens
                </p>
                <p
                  className={`text-xs mt-1 ${
                    user.notificationsEnabled
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {user.notificationsEnabled ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              onClick={toggleNotifications}
              disabled={loading}
              className={`relative w-14 h-7 rounded-full transition
                ${
                  user.notificationsEnabled
                    ? "bg-[#1DA1F2]"
                    : "bg-neutral-700"
                }
                ${loading ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 bg-white rounded-full transition-transform
                  ${
                    user.notificationsEnabled
                      ? "translate-x-7"
                      : "translate-x-0"
                  }
                `}
              />

              {loading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-xs text-gray-500 mt-4 px-1">
          You can change this anytime. Notifications may depend on your browser
          settings.
        </p>
      </div>
    </div>
  );
}
