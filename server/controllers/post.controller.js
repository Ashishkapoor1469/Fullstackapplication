import Post from "../models/postModel.js";
import AudioTweet from "../models/audioModel.js";

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = 8; 
    const skip = (page - 1) * limit;

    const textPosts = await Post.find()
      .populate("author", "username avatar fullname")
      .lean();

    const audioPosts = await AudioTweet.find()
      .populate("user", "username avatar fullname")
      .lean();

    // Merge all posts
    const allPosts = [...textPosts, ...audioPosts];

    // Sort by newest first
    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const paginatedPosts = allPosts.slice(skip, skip + limit);

    res.status(200).json({
      success: true,
      posts: paginatedPosts,
      currentPage: page,
      totalPages: Math.ceil(allPosts.length / limit),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};
