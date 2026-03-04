import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { GetAllUser} from "../../auth/auth"
import { trends, randomItems } from "../util/sidebarData";

export default function RightSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const abortRef = useRef(null);

  const trendingNews = randomItems(trends, 4);

  /*  SEARCH EFFECT */
  useEffect(() => {
    if (!query.trim()) {
      abortRef.current?.abort();
      setUsers([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        setLoading(true);
        const res = await GetAllUser(
          "user/search",
          { query },
          controller.signal
        );
        setUsers(Array.isArray(res) ? res : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [query]);

  const handleUserClick = (id) => {
    setQuery("");
    setUsers([]);
    navigate(`/profile/${id}`);
  };

  return (
    <aside className="hidden lg:block w-80 p-4 sticky top-0 h-screen space-y-4">

      {/* SEARCH — HOME ONLY */}
      {isHome && (
        <div className="relative">
          <input
            className="w-full border border-neutral-800 bg-black text-sm px-4 py-2
                       rounded-full outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* DROPDOWN */}
          {query && (
            <div className="absolute mt-2 w-full bg-black border border-neutral-900
                            rounded-xl overflow-hidden z-20 max-h-80 overflow-y-auto">

              {/* LOADING */}
              {loading && (
                <div className="p-4 flex justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              )}

              {/* RESULTS */}
              {!loading && users.length > 0 && users.map((u) => (
                <div
                  key={u._id}
                  onClick={() => handleUserClick(u._id)}
                  className="flex items-center gap-3 p-3 hover:bg-neutral-900 cursor-pointer"
                >
                  <img
                    src={u.avatar?.url || u.avatar}
                    className="w-8 h-8 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-bold">{u.fullname}</p>
                    <p className="text-xs text-gray-400">@{u.username}</p>
                  </div>
                </div>
              ))}

              {/* EMPTY */}
              {!loading && users.length === 0 && (
                <p className="p-3 text-sm text-gray-400 text-center">
                  No users found
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/*  WHAT’S HAPPENING */}
      <section className="border border-neutral-900 rounded-xl p-4">
        <h3 className="font-bold mb-3 text-lg">What’s happening</h3>

        {trendingNews.map((t, i) => (
          <div
            key={i}
            className="py-2 px-2 rounded hover:bg-neutral-800 cursor-pointer"
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

<section className="text-xs text-gray-500 space-y-2 px-2 flex flex-col justify-baseline items-baseline w-full h-full">
  <div className="flex flex-wrap gap-x-3 gap-y-1">
    <span className="hover:underline cursor-pointer">Terms of Service</span>
    <span className="hover:underline cursor-pointer">Privacy Policy</span>
    <span className="hover:underline cursor-pointer">Cookie Policy</span>
    <span className="hover:underline cursor-pointer">Accessibility</span>
    <span className="hover:underline cursor-pointer">Ads info</span>
  </div>

  <p className="text-gray-600">
    © {new Date().getFullYear()} ZITTER, Inc.
  </p>
</section>
    </aside>
  );
}