import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart, UserPlus, MessageCircle, Repeat2 } from "lucide-react";
import { generateNotification } from "../../components/util/genratenortification";
import { useToast } from "../../context/ToastContext";
import { useTranslation } from "react-i18next";

const iconMap = {
  like: <Heart className="text-pink-500" size={18} />,
  follow: <UserPlus className="text-[#1DA1F2]" size={18} />,
  reply: <MessageCircle className="text-green-500" size={18} />,
  repost: <Repeat2 className="text-green-500" size={18} />,
};

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);

  const queueRef = useRef([]);
  const processingRef = useRef(false);

  const { showToast } = useToast();
  const { t } = useTranslation();
  const location = useLocation();

  // ✅ Are we currently on inbox page?
  const isInboxOpen = location.pathname === "/notifications";

  /* 🔔 Toast helper */
  const notifyToast = (n) => {
    if (!isInboxOpen) {
      showToast(`${n.user} ${n.content}`, "info");
    }
  };

  /* 🧠 Process notification queue ONE BY ONE */
  const processQueue = () => {
    if (processingRef.current) return;
    if (queueRef.current.length === 0) return;

    processingRef.current = true;
    const next = queueRef.current.shift();

    setNotifications((prev) => [next, ...prev]);
    notifyToast(next);

    setTimeout(() => {
      processingRef.current = false;
      processQueue();
    }, 2000);
  };

  /* Initial notification */
  useEffect(() => {
    queueRef.current.push(generateNotification());
    processQueue();
  }, []);

  /* Auto notifications */
  useEffect(() => {
    const interval = setInterval(() => {
      queueRef.current.push(generateNotification());
      processQueue();
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredNotifications =
    activeTab === "mentions"
      ? notifications.filter((n) => n.mention)
      : notifications;

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 p-4 text-xl font-bold">
        {t("notifications.title")}
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 text-sm">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-3 font-bold ${
            activeTab === "all"
              ? "border-b-2 border-[#1DA1F2]"
              : "text-gray-400"
          }`}
        >
          {t("notifications.all")}
        </button>

        <button
          onClick={() => setActiveTab("mentions")}
          className={`flex-1 py-3 font-bold ${
            activeTab === "mentions"
              ? "border-b-2 border-[#1DA1F2]"
              : "text-gray-400"
          }`}
        >
          {t("notifications.mentions")}
        </button>
      </div>

      {/* Notifications */}
      {filteredNotifications.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 p-4 border-b border-gray-800 hover:bg-gray-900 transition cursor-pointer"
        >
          <div className="mt-1">{iconMap[item.type]}</div>

          <img
            src={item.avatar}
            alt={item.user}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex-1">
            <div className="flex gap-1 text-sm">
              <span className="font-bold">{item.user}</span>
              <span className="text-gray-400">{item.handle}</span>
              <span className="text-gray-400">· {item.time}</span>
            </div>
            <p className="text-sm text-gray-300">{item.content}</p>
          </div>
        </div>
      ))}

      {filteredNotifications.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          {t("notifications.empty")}
        </p>
      )}
    </div>
  );
}
