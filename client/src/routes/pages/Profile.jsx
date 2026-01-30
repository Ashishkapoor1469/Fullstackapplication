import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Heart } from "lucide-react";
import ProfileMedia from "../../components/Profile/ProfileMedia";
import { useTranslation } from "react-i18next";
export default function Profile() {
  const { user, userpost, totalposts, useraudio, totalaudio } = useAuth();
  const [ispost, setPost] = useState(false);
   const { t } = useTranslation();
  if (!user) return null;

  return (
    <div>
      <div className="h-40 bg-gray-700">
        <img src={""} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <img
          src={user.avatar || ""}
          className="w-24 h-24 rounded-full border-4 border-black -mt-16"
        />

        <h2 className="text-xl font-bold mt-2">{user.fullname}</h2>
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
      <div className="w-full h-full border-t border-neutral-900 mt-4 space-y-4 md:mb-0 mb-15">
       <div className="flex flex-col gap-1">
         <div className="px-4 text-gray-400 text-sm flex justify-end">
          {t("profile.totalPosts")} {totalposts}
        </div>

        <div className="px-4 text-gray-400 text-sm flex justify-end">
          {t("profile.totalAudio")} {totalaudio}
        </div>
       </div>
        <ProfileMedia posts={userpost} audios={useraudio} />
      </div>
    </div>
  );
}
