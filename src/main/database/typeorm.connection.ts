import { DataSource } from "typeorm";
import "dotenv/config";
import typeormConfig from "../config/typeorm.config";

export class DatabaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    console.log(process.env.DB_URL);
    if (!this._connection) {
      this._connection = await typeormConfig.initialize();
    }
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("A database não tá inicializada");
    }
    return this._connection;
  }
}
