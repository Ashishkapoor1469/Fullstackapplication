import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GetAllUser } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const abortRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    //  Empty query → reset
    if (!query.trim()) {
      abortRef.current?.abort();
      setUsers([]);
      setLoading(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      //  cancel previous request
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

        if (isMounted) {
          setUsers(Array.isArray(res) ? res : []);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
      abortRef.current?.abort();
    };
  }, [query]);

  //  HANDLE PROFILE NAVIGATION
  const handleUserClick = (id) => {
    setQuery("");
    setUsers([]);
    navigate(`/profile/${id}`);
  };

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="sticky top-0 bg-black p-4 border-b border-neutral-800 z-10">
        <input
          className="w-full bg-neutral-900 p-2 rounded-full outline-none"
          placeholder={t("search.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* EMPTY STATE */}
      {!query.trim() && (
        <div className="p-4 text-gray-400">
          {t("search.trends")}
        </div>
      )}

      {/*LOADING */}
      {loading && (
        <div className="p-4 flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      )}

      {/*  RESULTS */}
      <div>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user._id)}
            className="flex gap-3 p-4 border-b border-gray-800 hover:bg-gray-950 cursor-pointer"
          >
            <img
              src={user.avatar?.url || user.avatar}
              alt="avatar"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="font-bold">{user.fullname}</p>
              <p className="text-gray-400 text-sm">
                @{user.username}
              </p>
            </div>
          </div>
        ))}

        {!loading && query && users.length === 0 && (
          <div className="p-4 text-gray-400">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}