import { useState } from "react";
import PostList from "./PostList";
import AudioList from "./AudioList";
import { useTranslation } from "react-i18next";

export default function ProfileMedia({ posts = [], audios = [] }) {
  const [activeTab, setActiveTab] = useState("posts"); // posts | audio
 const { t } = useTranslation();
  return (
    <div >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 p-4 text-xl font-bold">
        {t("profile.media")}
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
      {activeTab === "posts" && (
        <PostList posts={posts} />
      )}

      {activeTab === "audio" && (
        <AudioList audios={audios} />
      )}
    </div>
  );
}
