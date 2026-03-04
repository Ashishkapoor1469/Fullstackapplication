import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import ProfileMedia from "../../components/Profile/ProfileMedia";
import { useTranslation } from "react-i18next";
import Edit from "../../components/Profile/EditProfile";
import { GetUserById, SkipLimit } from "../../auth/auth";
import ProfileSkeleton from "../../components/Profile/PorfileSkeleton";

const LIMIT = 5;

export default function Profile() {
  const { id } = useParams();
  const { t } = useTranslation();

  const {
    user: authUser,
    userpost,
    useraudio,
    totalposts,
    totalaudio,
    setUserPost,
    setUserAudios,
  } = useAuth();

  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [audios, setAudios] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalAudios, setTotalAudios] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ------------------ OWN OR OTHER PROFILE ------------------ */
  const isOwnProfile = authUser && (!id || id === authUser._id);

  /* ------------------ FETCH OTHER USER ------------------ */
  useEffect(() => {
    if (!authUser) return;

    if (isOwnProfile) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await GetUserById(`user/${id}`);

        setProfileUser(data.user);
        setPosts(data.posts || []);
        setAudios(data.audios || []);
        setTotalPosts(data.totalPosts || 0);
        setTotalAudios(data.totalAudios || 0);
      } catch (err) {
        console.error("PROFILE FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, authUser, isOwnProfile]);

  /* ------------------ DATA SOURCE ------------------ */
  const currentUser = isOwnProfile ? authUser : profileUser;
  const currentPosts = isOwnProfile ? userpost : posts;
  const currentAudios = isOwnProfile ? useraudio : audios;
  const currentTotalPosts = isOwnProfile ? totalposts : totalPosts;
  const currentTotalAudios = isOwnProfile ? totalaudio : totalAudios;

  /* ------------------ SKELETON ------------------ */
  if (!isOwnProfile) {
    if (loading || !currentUser) {
      return <ProfileSkeleton />;
    }
  }

  /* ------------------ LOAD MORE LOGIC ------------------ */
  const hasMore =
    currentPosts.length < currentTotalPosts ||
    currentAudios.length < currentTotalAudios;

  const handleLoadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = isOwnProfile
        ? await SkipLimit("user",currentPosts.length,LIMIT)
        : await GetUserById(
            `user/${id}?postSkip=${currentPosts.length}&audioSkip=${currentAudios.length}&limit=${LIMIT}`,
          );

      if (data?.posts?.length) {
        isOwnProfile
          ? setUserPost((p) => [...p, ...data.posts])
          : setPosts((p) => [...p, ...data.posts]);
      }

      if (data?.audios?.length) {
        isOwnProfile
          ? setUserAudios((a) => [...a, ...data.audios])
          : setAudios((a) => [...a, ...data.audios]);
      }
    } catch (err) {
      console.error("LOAD MORE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div>
      {/* Cover */}
      <div className="h-40 bg-gray-700" />

      {/* Profile Info */}
      <div className="p-4">
        <img
          src={currentUser.avatar?.url || currentUser.avatar}
          className="w-24 h-24 rounded-full border-4 border-black -mt-16 object-cover"
          alt="avatar"
        />

        <div className="flex justify-between">
          <h2 className="text-xl font-bold mt-2">{currentUser.fullname}</h2>

          {isOwnProfile && <Edit />}
        </div>

        <p className="text-gray-400">@{currentUser.username}</p>

        <p className="mt-2">{currentUser.bio || "No bio yet"}</p>

        <div className="flex gap-4 mt-2 text-sm">
          <span>
            <b>{currentUser.following || 0}</b> {t("profile.following")}
          </span>
          <span>
            <b>{currentUser.followers || 0}</b> {t("profile.followers")}
          </span>
        </div>
      </div>

      {/* Media */}
      <div className="border-t border-neutral-700 mt-4">
        <ProfileMedia
          posts={currentPosts}
          audios={currentAudios}
          totalposts={currentTotalPosts}
          totalaudio={currentTotalAudios}
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
    </div>
  );
}
