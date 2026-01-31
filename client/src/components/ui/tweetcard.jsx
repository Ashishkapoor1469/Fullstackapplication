// src/components/TweetCard.jsx
import {
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  BarChart,
  Bookmark,
} from "lucide-react";
import { formatNumber } from "../util/formatnumber";
import AudioPlayer from "../Profile/AudioPlayer";
export default function TweetCard({ tweet }) {
  return (
    <div className="flex gap-3 p-4 border-b border-gray-800 hover:bg-neutral-900 transition">
      {/* Avatar */}
      <img
        src={tweet.user.avatar.url || tweet.user.avatar}
        fetchpriority="high"
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between gap-2 text-sm items-center">
          <div className="flex gap-1 flex-wrap">
            <span className="font-bold text-white">{tweet.user.fullname}</span>
            <span className="text-gray-400">@{tweet.user.username}</span>
          </div>
          <span className="text-gray-400 text-nowrap  text-xs">
            {tweet?.createdAt
              ? new Date(tweet.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "no data"}
          </span>
        </div>

        {/* Content */}
        <p className="mt-1 font-semibold text-gray-200">{tweet.title}</p>
        {/* Image */}

        {tweet?.audioUrl && <AudioPlayer src={tweet.audioUrl} />}
        {tweet?.image && (
          <img
            src={tweet.image}
            alt="tweet"
            width={600}
            height={400}
            className="mt-3 rounded-xl w-full object-cover max-h-[500px]"
          />
        )}
        <p className="mt-1 text-gray-200 text-sm">{tweet.content}</p>
        {/* Actions */}
        <div className="flex justify-between mt-3 text-gray-400 text-sm">
          <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
            <MessageCircle size={18} />
            <span>{formatNumber(tweet.comments || 0)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
            <Repeat2 size={18} />
            <span>{formatNumber(tweet.reposts || 0)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <Heart size={18} />
            <span>{formatNumber(tweet.likes || 0)}</span>
          </div>

          <div className="flex items-center gap-1">
            <BarChart size={18} />
            <span>{formatNumber(tweet.views || 0)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-yellow-500 cursor-pointer">
            <Bookmark size={18} />
            <span>{formatNumber(tweet.bookmarks || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
