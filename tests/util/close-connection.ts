import { CacheConnection } from "../../src/main/database/cache.connection";
import { DatabaseConnection } from "../../src/main/database/typeorm.connection";

export const closeConnection = async () => {
    await DatabaseConnection.connection.destroy();
    await CacheConnection.connection.quit();
};

/* Este código exporta uma função chamada closeConnection que é responsável por encerrar a conexão com o banco de dados e com o cache utilizado na aplicação. 
Ele importa as classes CacheConnection e DatabaseConnection que são responsáveis pela conexão com o cache e com o banco de dados, respectivamente. A função utiliza os
métodos destroy() da classe DatabaseConnection e quit() da classe CacheConnection para encerrar as conexões. O await é utilizado para esperar que a conexão seja fechada
antes de finalizar a execução. */