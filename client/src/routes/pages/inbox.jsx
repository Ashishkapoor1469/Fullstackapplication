import { useEffect, useState } from "react";
import { Heart, UserPlus, MessageCircle, Repeat2 } from "lucide-react";
import { generateNotification } from "../../components/util/genratenortification";
import { useToast } from "../../context/ToastContext";

const iconMap = {
  like: <Heart className="text-pink-500" size={18} />,
  follow: <UserPlus className="text-[#1DA1F2]" size={18} />,
  reply: <MessageCircle className="text-green-500" size={18} />,
  repost: <Repeat2 className="text-green-500" size={18} />,
};

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const { showToast } = useToast();

  // 🔔 Toast message builder
  const notifyToast = (n) => {
    showToast(`${n.user} ${n.content} `, "info");
  };

  // ✅ Load initial notifications
  useEffect(() => {
    const initial = [
      generateNotification(),
      generateNotification(),
      generateNotification(),
    ];

    setNotifications(initial);

    // optional: toast only latest one
    notifyToast(initial[0]);
  }, []);

  // ✅ Auto notification every 10 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        const newNotification = generateNotification();

        setNotifications((prev) => [newNotification, ...prev]);

        // 🔥 SHOW TOAST ON NEW NOTIFICATION
        notifyToast(newNotification);
      },
      20 * 60 * 1000,
    ); // ⏱ 20 minutes

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
        Notifications
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
          All
        </button>

        <button
          onClick={() => setActiveTab("mentions")}
          className={`flex-1 py-3 font-bold ${
            activeTab === "mentions"
              ? "border-b-2 border-[#1DA1F2]"
              : "text-gray-400"
          }`}
        >
          Mentions
        </button>
      </div>

      {/* Notifications */}
      {filteredNotifications.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 p-4 border-b border-gray-800 hover:bg-gray-900 transition cursor-pointer"
        >
          {/* Icon */}
          <div className="mt-1">{iconMap[item.type]}</div>

          {/* Avatar */}
          <img
            src={item.avatar}
            alt={item.user}
            className="w-10 h-10 rounded-full"
          />

          {/* Content */}
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

      {/* Empty state */}
      {filteredNotifications.length === 0 && (
        <p className="text-center text-gray-500 py-10">No notifications yet</p>
      )}
    </div>
  );
}
