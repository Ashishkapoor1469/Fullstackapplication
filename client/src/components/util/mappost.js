export const mapPostToTweet = (post) => ({
  id: post._id,
  user: {
    username: post.author?.username || post.user?.username,
    avatar: post.author?.avatar || post.user?.avatar,
    fullname: post.author?.fullname || post.user?.fullname,
  },
  title:post.title,
  content: post.content,
  image: post.image || null,
  audioUrl: post.audioUrl || null,
  createdAt: post.createdAt,
  likes: post.likes || 0,
});
