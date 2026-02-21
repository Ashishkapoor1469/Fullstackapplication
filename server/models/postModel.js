import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      // <-- new field
      type: String, // store image URL
      default: "", // optional
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;

const LikeSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: String,
    required: true,
  },
});
