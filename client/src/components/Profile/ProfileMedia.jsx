import { useState } from "react";
import PostList from "./PostList";
import AudioList from "./AudioList";
import { useTranslation } from "react-i18next";

export default function ProfileMedia({
  posts = [],
  audios = [],
  totalposts,
  totalaudio,
}) {
  const [activeTab, setActiveTab] = useState("posts"); // posts | audio
  const { t } = useTranslation();
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 p-4 text-xl font-bold">
        <div className="flex justify-between">
          {t("profile.media")}
          <div className="flex flex-col gap-1">
            <div className="px-4 text-gray-400 text-sm flex justify-end">
              {t("profile.totalPosts")} {totalposts}
            </div>

            <div className="px-4 text-gray-400 text-sm flex justify-end">
              {t("profile.totalAudio")} {totalaudio}
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 text-sm">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 py-3 font-bold ${
            activeTab === "posts"
              ? "border-b-2 border-[#1DA1F2]"
              : "text-gray-400"
          }`}
        >
          {t("profile.posts")}
        </button>

        <button
          onClick={() => setActiveTab("audio")}
          className={`flex-1 py-3 font-bold ${
            activeTab === "audio"
              ? "border-b-2 border-[#1DA1F2]"
              : "text-gray-400"
          }`}
        >
          {t("profile.audio")}
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "posts" && <PostList posts={posts} />}

      {activeTab === "audio" && <AudioList audios={audios} />}
    </div>
  );
}
