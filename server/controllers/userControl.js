const User = require("../models/userModel");
const Post = require("../models/postModel");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All feild are required" });
    }
    //checking the user is already exist of not
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("user already exist");
      return res.status(400).json("User already exit");
    }
    //hash the password of user
    const hashpassword = await bycript.hash(password, 10);
    const UserData = {
      username: username,
      fullname: fullname,
      email: email,
      password: hashpassword,
    };
    await User.create(UserData);
    res.status(201).json({
      message: "user created",
      token: await UserData.gernrateToken(),
      userId: await UserData._id.toString(),
    });
  } catch (err) {
    res.status(500).send({ message: `error form server ${err}` });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { fullname, bio } = req.body;

    await User.findByIdAndUpdate(req.userId, { fullname, bio }, { new: true });
    res.status(200).send("user updated");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};
const UserforgetPass = async (req, res) => {};

const UserPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userPost = {};
    const post = Post.create(userPost);
  } catch (error) {}
};


const JJ = async (req,res)=>{
  res.json({message:"Helo form server"})
}
module.exports = {
  user,
  userUpdate,
  UserforgetPass,
  UserPost,
  JJ
};
