import { Heart } from "lucide-react";

export default function PostList({ posts }) {
  if (!posts.length) {
    return <p className="text-center text-gray-500 py-10">No posts yet</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post._id}
          className="p-4 border-b border-gray-800 hover:bg-gray-900 transition"
        >
          <div className="flex justify-between">
            {" "}
            <p className="font-semibold">{post.title}</p>
            <p className="text-xs  text-gray-500 mt-2">
              {post?.createdAt
                ? new Date(post.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "no data"}
            </p>
          </div>
          {post.image && (
            <img
              src={post.image}
              className="mt-3 rounded-xl w-full object-cover"
            />
          )}
          <p className="text-sm">{post.content}</p>
          <div className="flex items-center mt-2 gap-1 hover:text-pink-500 cursor-pointer">
            <Heart size={18} />
            <span>{post.likes}</span>
          </div>
        </div>
      ))}
    </>
  );
}
