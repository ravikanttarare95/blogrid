import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

const setCache = async (key, value) => {
  await client.set(key, JSON.stringify(value));
  return true;
};

const getCache = async (key) => {
  const value = await client.get(key);
  return JSON.parse(value);
};

const clearCache = async (key = null) => {
  if (key) {
    await client.del(key);
  } else {
    await client.sendCommand(["FLUSHALL"]);
  }
};

export { setCache, getCache, clearCache };
