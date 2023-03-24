import "dotenv/config";

export const cacheEnv = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT!),
  usarname: process.env.REDIS_USER,
  password: process.env.REDIS_PASS,
};
