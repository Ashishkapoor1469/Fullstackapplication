import { createClient } from "redis";
import redis from "./redis.js";
const redisClient = createClient({
  url: process.env.REDIS_URL, // or redis://localhost:6379
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

await redisClient.connect();

export default redisClient;

const isRedisRunning = async () => {
  try {
    const pong = await redis.ping();
    console.log("Redis is running:", pong);
  } catch (err) {
    console.log("Redis is NOT running");
  }
};

await isRedisRunning();
