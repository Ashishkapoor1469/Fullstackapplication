import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// import rateLimit from "express-rate-limit";
// import redisClient from "./config/redis.js";
// import RedisStore from "rate-limit-redis";
import userRouter from "./routes/user.route.js";
import googleRouter from "./routes/google.route.js";
import audioTweet from "./routes/tweet.route.js";
import posts from "./routes/post.route.js";
import db from "./utils/mongodb.js";
const app = express();

// const apiLimiter = rateLimit({
//   store: new RedisStore({
//     sendCommand: (...args) => redisClient.sendCommand(args),
//   }),
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

const Port = 4000;
const corsOptions = {
  origin: ["http://localhost:5173", "https://minitwitter-psi.vercel.app"],
  method: ["GET", "POST", "PATCH", "DELETE", "PUT", "HEAD"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use("/api/", apiLimiter);
app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});
//h
app.use("/api/auth", userRouter);
app.use("/api/auth", googleRouter);
app.use("/api/tweet", audioTweet);
app.use("/api", posts);
db().then(() => {
  app.listen(Port, "0.0.0.0", () => {
    console.log(`Server is listen at ${Port}`);
  });
});
