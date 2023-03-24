import { CacheConnection } from "../../src/main/database/cache.connection";
import { DatabaseConnection } from "../../src/main/database/typeorm.connection";

export const closeConnection = async () => {
    await DatabaseConnection.connection.destroy();
    await CacheConnection.connection.quit();
};
