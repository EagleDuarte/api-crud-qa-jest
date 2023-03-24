import redis from "ioredis";
import { cacheEnv } from "../../app/envs/cache.env";

export class CacheConnection {
  private static _connection: redis;

  public static async connect() {
    if (!this._connection) {
      this._connection = new redis({
        host: cacheEnv.host,
        port: cacheEnv.port,
        username: cacheEnv.usarname,
        password: cacheEnv.password,
      });
    }
    console.log("Redis is connected.");
  }
  public static get connection() {
    if (!this._connection) {
      throw new Error("Redis is not connected.");
    }
    return this._connection;
  }
}
