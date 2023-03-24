import { CacheConnection } from "../../src/main/database/cache.connection";
import { DatabaseConnection } from "../../src/main/database/typeorm.connection";

export const openConnection = async () => {
    await DatabaseConnection.connect();
    await CacheConnection.connect();
};
