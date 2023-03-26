import { CacheConnection } from "../../src/main/database/cache.connection";
import { DatabaseConnection } from "../../src/main/database/typeorm.connection";

export const openConnection = async () => {
    await DatabaseConnection.connect();
    await CacheConnection.connect();
};

/* Esse código exporta a função openConnection que é usada para estabelecer a conexão com o banco de dados e com o cache. Ele importa as classes CacheConnection e 
DatabaseConnection do diretório src/main/database. A função utiliza await para chamar os métodos connect() de ambas as classes, a fim de estabelecer as conexões. */
