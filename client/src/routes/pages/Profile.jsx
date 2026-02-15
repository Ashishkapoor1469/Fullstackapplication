import { useState } from "react";
import { useAuth } from "../../context/authContext";
import ProfileMedia from "../../components/Profile/ProfileMedia";
import { useTranslation } from "react-i18next";
import Edit from "../../components/Profile/EditProfile";
import { SkipLimit } from "../../auth/auth";

const LIMIT = 5;

export default function Profile() {
  const {
    user,
    userpost,
    useraudio,
    totalposts,
    totalaudio,
    setUserPost,
    setUserAudios,
  } = useAuth();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const hasMore = userpost.length < totalposts || useraudio.length < totalaudio;

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const skip = Math.max(userpost.length, useraudio.length);
      const data = await SkipLimit("user", skip, LIMIT);
      console.log("API DATA:", data);

      if (data?.posts?.length) {
        setUserPost((prev) => {
          const ids = new Set(prev.map((p) => p._id));
          return [...prev, ...data.posts.filter((p) => !ids.has(p._id))];
        });
      }

      if (data?.audios?.length) {
        setUserAudios((prev) => {
          const ids = new Set(prev.map((a) => a._id));
          return [...prev, ...data.audios.filter((a) => !ids.has(a._id))];
        });
      }
    } catch (err) {
      console.error("LOAD MORE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      {/* Cover */}
      <div className="h-40 bg-gray-700" />

      {/* Profile Info */}
      <div className="p-4">
        <img
          src={user.avatar?.url || user.avatar}
          loading="lazy"
          className="w-24 h-24 rounded-full border-4 border-black -mt-16 object-cover"
        />

        <div className="flex justify-between flex-wrap">
          <h2 className="text-xl font-bold mt-2">{user.fullname}</h2>
          <Edit />
        </div>

        <p className="text-gray-400">@{user.username}</p>
        <p className="mt-2">{user.bio || "No bio yet"}</p>

        <div className="flex gap-4 mt-2 text-sm">
          <span>
            <b>{user.following || 0}</b> {t("profile.following")}
          </span>
          <span>
            <b>{user.followers || 0}</b> {t("profile.followers")}
          </span>
        </div>
      </div>

      {/* Media */}
      <div className="border-t border-neutral-700 mt-4">
        <ProfileMedia
          posts={userpost}
          audios={useraudio}
          totalposts={totalposts}
          totalaudio={totalaudio}
        />
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center my-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 rounded bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 my-6">No more posts</p>
      )}
    </div>
  );
}
