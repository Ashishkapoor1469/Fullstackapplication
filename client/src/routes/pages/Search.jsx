import { useEffect, useState } from "react";
import {
  generateSearchTweets,
  formatNumber,
} from "../../components/util/searchTweets";

export default function Search() {
  const [tweets, setTweets] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setTweets(generateSearchTweets(12));
  }, []);

  return (
    <div>
      {/* 🔍 Search Bar */}
      <div className="sticky top-0 bg-black p-4 border-b border-gray-800 z-10">
        <input
          className="w-full bg-gray-900 p-2 rounded-full outline-none"
          placeholder="Search Twitter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 🔁 CONDITIONAL RENDERING */}
      {query.trim() === "" ? (
        /* 📈 TRENDS */
        <div className="p-4">
          <h3 className="font-bold mb-4">Trends for you</h3>

          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Trending</p>
              <p className="font-bold">#ReactJS</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Trending</p>
              <p className="font-bold">#WebDevelopment</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Trending</p>
              <p className="font-bold">#JavaScript</p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Trending</p>
              <p className="font-bold">#MERN</p>
            </div>
          </div>
        </div>
      ) : (
        /* 🐦 SEARCH RESULTS */
        <div>
          {tweets
            .filter((t) =>
              t.content.toLowerCase().includes(query.toLowerCase())
            )
            .map((tweet) => (
              <div
                key={tweet.id}
                className="flex gap-3 p-4 border-b border-gray-800 hover:bg-gray-950"
              >
                <img
                  src={tweet.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <div className="flex gap-2 text-sm">
                    <span className="font-bold">{tweet.name}</span>
                    <span className="text-gray-400">{tweet.handle}</span>
                    <span className="text-gray-400">· {tweet.time}</span>
                  </div>

                  <p className="mt-1 text-sm">{tweet.content}</p>

                  <div className="flex gap-6 text-gray-400 text-xs mt-2">
                    <span>❤️ {formatNumber(tweet.likes)}</span>
                    <span>👁️ {formatNumber(tweet.views)}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
