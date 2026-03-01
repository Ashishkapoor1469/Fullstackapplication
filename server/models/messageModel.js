import mongoose from "mongoose";

const messagesScgema = new mongoose.Schema(
  {
    message: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sendTo: String,
  },
  { timestamps: true },
);
const Message = mongoose.model("Message", messagesScgema);
export default Message;
