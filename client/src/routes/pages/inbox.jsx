import {
  Heart,
  UserPlus,
  MessageCircle,
  Repeat2,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Elon Musk",
    handle: "@elonmusk",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "liked your tweet",
    time: "2h",
  },
  {
    id: 2,
    type: "follow",
    user: "React Dev",
    handle: "@reactdev",
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "followed you",
    time: "4h",
  },
  {
    id: 3,
    type: "reply",
    user: "Next.js",
    handle: "@nextjs",
    avatar: "https://i.pravatar.cc/150?img=8",
    content: "replied to your tweet",
    time: "1d",
  },
];

const iconMap = {
  like: <Heart className="text-pink-500" size={18} />,
  follow: <UserPlus className="text-[#1DA1F2]" size={18} />,
  reply: <MessageCircle className="text-green-500" size={18} />,
  repost: <Repeat2 className="text-green-500" size={18} />,
};

export default function Inbox() {
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 p-4 text-xl font-bold">
        Notifications
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 text-sm">
        <button className="flex-1 py-3 font-bold border-b-2 border-[#1DA1F2]">
          All
        </button>
        <button className="flex-1 py-3 text-gray-400 hover:text-white">
          Mentions
        </button>
      </div>

      {/* Notification List */}
      {notifications.map((item) => (
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
    </div>
  );
}
