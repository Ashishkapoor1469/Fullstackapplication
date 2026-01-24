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

export default function TweetCard({ tweet }) {
  return (
    <div className="flex gap-3 p-4 border-b border-gray-800 hover:bg-neutral-900 transition">
      <img src={tweet.avatar} className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        <div className="flex gap-2 text-sm">
          <span className="font-bold">{tweet.name}</span>
          <span className="text-gray-400">{tweet.handle}</span>
          <span className="text-gray-400">· {tweet.time}</span>
        </div>
        <p className="mt-1">{tweet.content}</p>
        {tweet.image && (
          <img
            src={tweet.image}
            alt="tweet"
            className="mt-3 rounded-xl w-full object-cover"
          />
        )}
        <div className="flex justify-between mt-3 text-gray-400 text-sm">
          <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
            <MessageCircle size={18} />
            <span>{formatNumber(tweet.comments)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
            <Repeat2 size={18} />
            <span>{formatNumber(tweet.reposts)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
            <Heart size={18} />
            <span>{formatNumber(tweet.likes)}</span>
          </div>

          <div className="flex items-center gap-1">
            <BarChart size={18} />
            <span>{formatNumber(tweet.views)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-yellow-500 cursor-pointer">
            <Bookmark size={18} />
            <span>{formatNumber(tweet.bookmarks)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
