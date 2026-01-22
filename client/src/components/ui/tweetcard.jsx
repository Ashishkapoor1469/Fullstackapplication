// src/components/TweetCard.jsx
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";

export default function TweetCard({ tweet }) {
  return (
    <div className="flex gap-3 p-4 border-b border-gray-800 hover:bg-gray-900 transition">
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
            className="mt-3 rounded-xl border border-gray-800"
          />
        )}
        <div className="flex justify-between mt-3 text-gray-400">
          <MessageCircle size={18} />
          <Repeat2 size={18} />
          <Heart size={18} />
          <Share size={18} />
        </div>
      </div>
    </div>
  );
}
