import { useAuth } from "../../context/authContext";
import { Heart } from "lucide-react";
export default function Profile() {
  const { user, userpost, totalposts } = useAuth();

  if (!user) return null;

  return (
    <div>
      <div className="h-40 bg-gray-700">
        <img src={""} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
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
            <b>{user.following || 0}</b> Following
          </span>
          <span>
            <b>{user.followers || 0}</b> Followers
          </span>
        </div>
      </div>
      <div className="w-full h-full border-t border-neutral-900 mt-4 space-y-4">
        <div className="px-4 text-gray-400 text-sm flex justify-end">
          Total Posts: {totalposts}
        </div>
        {userpost.map((tweet, i) => {
          return (
            <div key={i} className="p-2">
              <div className="flex gap-3 p-4 border border-neutral-800 hover:bg-neutral-900 transition">
                <img
                  src={
                    tweet.avatar || user.avatar || "https://i.pravatar.cc/150"
                  }
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex gap-2 text-sm">
                    <span className="font-bold">{tweet.title}</span>
                    <span className="text-gray-400">
                      ·{" "}
                      {tweet?.createdAt
                        ? new Date(user.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "no data"}
                    </span>
                  </div>
                  <p className="mt-1">{tweet.content}</p>
                  {tweet.image && (
                    <img
                      src={tweet.image}
                      alt="tweet"
                      className="mt-3 rounded-xl w-full object-cover"
                    />
                  )}
                </div>
              </div>
              {/* <div className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
                <Heart size={18} />
                <span>{tweet.likes}</span>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
