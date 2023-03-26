import { DataSource } from "typeorm";
import "dotenv/config";

let dataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: ["src/app/shared/entities/**/*.ts"],
  migrations: ["src/app/shared/migrations/**/*.ts"],
  schema: "Tasks",
});

if (process.env.NODE_ENV === "test") {
  dataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite3",
    synchronize: false,
    entities: ["src/app/shared/entities/**/*.ts"],
    migrations: ["tests/app/shared/migrations/**/*.ts"],
  });
}

export default dataSource;

/* Este código define e exporta um objeto que representa as configurações da conexão com o banco de dados do tipo Postgres ou SQLite, dependendo do valor da variável de ambiente "NODE_ENV".

O objeto DataSource é configurado com as seguintes propriedades:

"type": o tipo do banco de dados (postgres ou sqlite);
"url": a URL do banco de dados Postgres;
"database": o nome do arquivo do banco de dados SQLite;
"ssl": um objeto com as configurações de SSL para conexões seguras (usado apenas com Postgres);
"synchronize": indica se as entidades e migrações devem ser sincronizadas automaticamente com o banco de dados (false por padrão);
"entities": um array com os caminhos dos arquivos de definição das entidades do banco de dados;
"migrations": um array com os caminhos dos arquivos de definição das migrações do banco de dados;
"schema": o nome do schema a ser usado com o banco de dados (usado apenas com Postgres).
Se a variável de ambiente "NODE_ENV" for definida como "test", a configuração será feita para o banco de dados SQLite. Caso contrário, a configuração será para o banco de dados Postgres. */
