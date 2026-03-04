import mongoose from "mongoose";

const FollowerSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Follower: {
    type: String,
    required: true,
  },
});

const FollowingSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Following: {
    type: String,
    required: true,
  },
  isPending:{
     type:Boolean,
     default:true
  }
});

const Followers = mongoose.model("Followers", FollowerSchema);
const Followings = mongoose.model("Followings", FollowingSchema);
export default { Followers, Followings };
