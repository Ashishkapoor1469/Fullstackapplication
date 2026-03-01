import User from "../../models/userModel.js";
import Post from "../../models/postModel.js";
import AudioTweet from "../../models/audioModel.js";
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query required" });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullname: { $regex: query, $options: "i" } },
      ],
    })
      .select("fullname username avatar")
      .limit(8); // only needed fields

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const skip = 0;
    const limit = 5;
    const user = await User.findById(req.params.id).select("-password"); // never send password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ author: req.params.id })
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .lean();

    // 3️ Total posts count
    const totalPosts = await Post.countDocuments({ author: req.params.id });
    const audios = await AudioTweet.find({ user: req.params.id })
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit))
      .lean();

    const totalAudios = await AudioTweet.countDocuments({
      user: req.params.id,
    });
    // 4️Return combined data
    return res.status(200).json({
      user,
      posts,
      totalPosts,
      audios,
      totalAudios,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
