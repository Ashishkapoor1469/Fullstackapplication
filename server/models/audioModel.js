import mongoose from "mongoose";

const AudioTweetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, default: "" },
    content: { type: String, default: "" },
    audioUrl: { type: String, default: "" }, // <-- make it optional
  },
  { timestamps: true },
);

const AudioTweet = mongoose.model("AudioTweet", AudioTweetSchema);
export default AudioTweet;
