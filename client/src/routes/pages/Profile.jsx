import { useAuth } from "../../context/authContext";
import ProfileMedia from "../../components/Profile/ProfileMedia";
import { useTranslation } from "react-i18next";
import Edit from "../../components/Profile/EditProfile";
export default function Profile() {
  const { user, userpost, totalposts, useraudio, totalaudio } = useAuth();
  const { t } = useTranslation();
  if (!user) return null;

  return (
    <div>
      <div className="h-40 bg-gray-700">
        <img src={""} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <img
          src={user.avatar.url || user.avatar}
          loading="lazy"
          className="w-24 h-24 rounded-full border-4 object-cover border-black -mt-16"
        />

        <div className="flex justify-between flex-wrap">
          <h2 className="text-xl font-bold mt-2">{user.fullname}</h2>
          <Edit />
        </div>
        <p className="text-gray-400">@{user.username}</p>
        <p className="mt-2">{user.bio || "No bio yet"}</p>
        <p className="mt-2">
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "no data"}
        </p>
        <div className="flex gap-4 mt-2 text-sm">
          <span>
            <b>{user.following || 0}</b> {t("profile.following")}
          </span>
          <span>
            <b>{user.followers || 0}</b> {t("profile.followers")}
          </span>
        </div>
      </div>
      <div className="w-full h-full border-t border-neutral-700 mt-4 md:mb-0 mb-15">
        <ProfileMedia
          posts={userpost}
          audios={useraudio}
          totalposts={totalposts}
          totalaudio={totalaudio}
        />
      </div>
    </div>
  );
}
