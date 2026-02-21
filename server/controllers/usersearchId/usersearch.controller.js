import User from "../../models/userModel";

const GetUsers = async (req, res) => {
  try {
    const { username } = req.body;
    const userDetails = User.find({ username });
  } catch (error) {}
};
