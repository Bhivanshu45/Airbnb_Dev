import IORedis from "ioredis";
import Redlock from "redlock";
import { serverConfig } from "./index";

export const redisClient = new IORedis(
  serverConfig.REDIS_URL
);

redisClient.on("connect", () => {
  console.log("Redis connected!!");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export const redlockConfig = new Redlock(
  [redisClient],
  {
    driftFactor: 0.01,
    retryCount: 10,
    retryDelay: 200,
    retryJitter: 200,
  }
);