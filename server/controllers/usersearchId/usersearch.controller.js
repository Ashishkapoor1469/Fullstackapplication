import mongoose from "mongoose";
import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";
import AudioTweet from "../../models/audioModel.js";

export const searchUsers = async (req, res) => {
  try {
    const query = req.body?.query?.trim();

    // ✅ Guard clause
    if (!query) {
      return res.status(400).json({ message: "Search query required" });
    }

    // ✅ If query is MongoDB ObjectId → search by ID
    if (mongoose.Types.ObjectId.isValid(query)) {
      const user = await User.findById(query).select(
        "fullname username avatar"
      );
      return res.status(200).json(user ? [user] : []);
    }

    // ✅ Normal text search
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullname: { $regex: query, $options: "i" } },
      ],
    })
      .select("fullname username avatar")
      .limit(8);

    res.status(200).json(users);
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [posts, totalPosts, audios, totalAudios] = await Promise.all([
      Post.find({ author: id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Post.countDocuments({ author: id }),

      AudioTweet.find({ user: id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      AudioTweet.countDocuments({ user: id }),
    ]);

    return res.status(200).json({
      user,
      posts,
      totalPosts,
      audios,
      totalAudios,
      page,
      limit,
    });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
