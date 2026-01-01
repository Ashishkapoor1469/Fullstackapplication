const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema);