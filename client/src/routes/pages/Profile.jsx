import { useAuth } from "../../context/authContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <div className="h-40 bg-gray-700" />

      <div className="p-4">
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
          className="w-24 h-24 rounded-full border-4 border-black -mt-16"
        />

        <h2 className="text-xl font-bold mt-2">{user.fullname}</h2>
        <p className="text-gray-400">@{user.username}</p>
        <p className="mt-2">{user.bio || "No bio yet"}</p>
        <p className="mt-2">{user.createdAt || "no data"}</p>
        <div className="flex gap-4 mt-2 text-sm">
          <span>
            <b>{user.following || 0}</b> Following
          </span>
          <span>
            <b>{user.followers || 0}</b> Followers
          </span>
        </div>
      </div>
    </div>
  );
}
