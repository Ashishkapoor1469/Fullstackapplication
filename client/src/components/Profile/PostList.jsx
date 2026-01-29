export default function PostList({ posts }) {
  if (!posts.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No posts yet
      </p>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <div
          key={post._id}
          className="p-4 border-b border-gray-800 hover:bg-gray-900 transition"
        >
          <p className="text-sm">{post.content}</p>

          {post.image && (
            <img
              src={post.image}
              className="mt-3 rounded-xl w-full object-cover"
            />
          )}

          <p className="text-xs text-gray-500 mt-2">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </>
  );
}
