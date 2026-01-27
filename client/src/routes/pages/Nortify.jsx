import { useAuth } from "../../context/authContext";
import { PostUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { useState } from "react";

export default function Nortify() {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const toggleNotifications = async () => {
    if (loading) return;

    try {
      // Ask browser permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        showToast("Please enable browser notification", "info");
        return;
      }

      setLoading(true);

      const token = localStorage.getItem("token");
      const res = await PostUser("toggle-notifications", {}, token);

      if (!res.success) {
        showToast(res.message || "Failed to update settings", "error");
        return;
      }

      // Update global auth state
      setUser((prev) => ({
        ...prev,
        notificationsEnabled: res.enabled,
      }));

      showToast(res.message, "success");
    } catch (error) {
      console.error("Notification toggle error:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <header className="sticky top-0 h-15 border-b flex justify-center items-center text-xl font-bold backdrop-blur-xl">
        Notification Settings
      </header>

      <div className="p-6 flex justify-center">
        <div className="border rounded-xl p-6 w-full max-w-md flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Browser Notifications</h3>
            <p className="text-sm text-gray-500">
              Notify when tweets contain special keywords
            </p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleNotifications}
            disabled={loading}
            className={`w-14 h-7 rounded-full relative transition-all
              ${user.notificationsEnabled ? "bg-green-500" : "bg-gray-400"}
              ${loading ? "opacity-30 cursor-not-allowed" : ""}
            `}
          >
            {/* Toggle knob */}
            <div
              className={`h-6 w-6 bg-white rounded-full absolute top-0.5 transition-all
                ${user.notificationsEnabled ? "translate-x-7" : "translate-x-1"}
              `}
            />

            {/* Loading spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
