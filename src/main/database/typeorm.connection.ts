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
      throw new Error("Sorry, database is still not running!");
    }
    return this._connection;
  }
}

/* Este código importa dois módulos: "DataSource" do pacote "typeorm" e "dotenv/config" que carrega as variáveis de ambiente do arquivo ".env". Também importa um objeto de 
configuração do TypeORM, definido em um arquivo separado "typeorm.config".

Em seguida, a classe "DatabaseConnection" é definida com dois métodos estáticos. O primeiro método "connect()" é usado para estabelecer uma conexão com o banco de dados
definido no objeto de configuração. Se ainda não houver uma conexão ativa, o método "initialize()" é chamado a partir do objeto de configuração TypeORM para criar uma nova
conexão.
O segundo método estático "connection()" é usado para obter a conexão ativa com o banco de dados. Se a conexão ainda não foi estabelecida, uma exceção é lançada com a 
mensagem "A database não tá inicializada".
Essa classe é útil para gerenciar uma única conexão de banco de dados em um aplicativo Node.js, garantindo que apenas uma conexão seja estabelecida por instância do 
aplicativo e facilitando o acesso à conexão em outras partes do código. */
