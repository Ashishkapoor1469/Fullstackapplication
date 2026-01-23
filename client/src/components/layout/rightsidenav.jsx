import { useState } from "react";
import { useLocation } from "react-router-dom";
import { users, trends, randomItems } from "../util/sidebarData";

export default function RightSidebar() {
  const location = useLocation();
  const isHome = location.pathname === "/"; //only home

  const [query, setQuery] = useState("");

  const suggestedUsers = randomItems(users, 3);
  const trendingNews = randomItems(trends, 4);

  const searchResults = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.handle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <aside className="hidden lg:block w-80 p-4 sticky top-0 xl:right-11 h-screen space-y-1.5">
      
      {/* 🔍 Search — ONLY ON HOME */}
      {isHome && (
        <div className="relative">
          <input
            className="w-full border border-y-neutral-300 text-sm px-4 py-2 rounded-full outline-none
                       focus:ring-2 focus:ring-[#1DA1F2]"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Search Dropdown */}
          {query && (
            <div className="absolute mt-2 w-full bg-black border border-neutral-900
                            rounded-xl overflow-hidden z-20">
              {searchResults.length ? (
                searchResults.map((u) => (
                  <div
                    key={u.handle}
                    className="flex items-center gap-3 p-3 hover:bg-gray-900 cursor-pointer"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?img=${u.img}`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-bold">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.handle}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-3 text-sm text-gray-400">No results found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 📰 What's happening */}
      <section className="border-neutral-900 border rounded-xl p-4">
        <h3 className="font-bold mb-3 text-lg">What’s happening</h3>

        {trendingNews.map((t, i) => (
          <div
            key={i}
            className="py-2 px-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            <p className="text-xs text-gray-400">{t.category}</p>
            <p className="font-semibold">{t.title}</p>
            <p className="text-xs text-gray-400">{t.posts} posts</p>
          </div>
        ))}

        <button className="text-[#1DA1F2] text-sm mt-2 hover:underline">
          Show more
        </button>
      </section>

      {/* 👤 Who to follow */}
      <section className="border-neutral-900 border rounded-xl p-4">
        <h3 className="font-bold mb-3 text-lg">Who to follow</h3>

        {suggestedUsers.map((u) => (
          <div
            key={u.handle}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/150?img=${u.img}`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-sm">{u.name}</p>
                <p className="text-xs text-gray-400">{u.handle}</p>
              </div>
            </div>

            <button
              className="bg-white text-black text-xs font-bold px-4 py-1.5
                         rounded-full hover:bg-gray-200 transition"
            >
              Follow
            </button>
          </div>
        ))}

        <button className="text-[#1DA1F2] text-sm mt-2 hover:underline">
          Show more
        </button>
      </section>
    </aside>
  );
}
