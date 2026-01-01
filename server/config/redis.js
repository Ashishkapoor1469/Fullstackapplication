import redis from "redis";

const redisClient = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

(async () => {
  await redisClient.connect();
  console.log("Redis Connected");
})();

export default redisClient;   
