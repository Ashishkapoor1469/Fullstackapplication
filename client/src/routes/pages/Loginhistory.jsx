import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone, ShieldCheck, ChevronLeft } from "lucide-react";
import { GetUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function LoginHs() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastShownRef = useRef(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await GetUser("user/login-history");
        setHistory(res.history || []);

        if (!toastShownRef.current) {
          showToast(res.message || "Showing recent login activity", "info");
          toastShownRef.current = true;
        }
      } catch (err) {
        console.error("Failed to load login history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [showToast]);

  return (
    <div className="max-w-xl mx-auto text-white">
      {/* Header */}
      <header className="sticky flex gap-2 top-0 z-10 bg-black/70 backdrop-blur border-b border-neutral-800 px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <div className="">
          <h1 className="text-lg font-bold">{t("loginHistory.title")}</h1>
          <p className="text-xs text-gray-400">
            Devices that recently logged into your account
          </p>
        </div>
      </header>

      {/* Skeleton Loader */}
      {loading && (
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse border border-neutral-800 rounded-xl p-4 space-y-2"
            >
              <div className="h-4 bg-neutral-800 rounded w-1/2" />
              <div className="h-3 bg-neutral-800 rounded w-1/3" />
              <div className="h-3 bg-neutral-800 rounded w-1/4" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && history.length === 0 && (
        <p className="p-6 text-center text-gray-400">
          {t("loginHistory.noActivity")}
        </p>
      )}

      {/* Login Items */}
      {!loading &&
        history.map((item) => (
          <div
            key={item._id}
            className="px-4 py-4 border-b border-neutral-800 hover:bg-neutral-900 transition"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="mt-1 text-[#1DA1F2]">
                {item.devicetype === "mobile" ? (
                  <Smartphone size={20} />
                ) : (
                  <Monitor size={20} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {item.browser || "Unknown browser"} ·{" "}
                  {item.os || "Unknown OS"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {item.devicetype || "Unknown device"}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(item.loginAt).toLocaleString()}
                </p>
              </div>

              {/* Status */}
              <ShieldCheck
                size={18}
                className="text-green-500 mt-1"
                title="Verified login"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
