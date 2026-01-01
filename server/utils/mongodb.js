import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log(`error for DB ${error}`);
    process.exit(0);
  }
};

export default ConnectDB;
