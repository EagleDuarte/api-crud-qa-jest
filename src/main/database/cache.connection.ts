import redis from "ioredis";
import { redisEnv } from "../../app/envs/redis.env";

export class CacheConnection {
  private static _connection: redis;

  public static async connect() {
    if (!this._connection) {
      this._connection = new redis({
        host: redisEnv.host,
        port: redisEnv.port,
        username: redisEnv.usarname,
        password: redisEnv.password,
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

/* Este código importa o pacote "ioredis" e o objeto "redisEnv" do arquivo de configuração "redis.env". Em seguida, a classe "CacheConnection" é definida com dois métodos estáticos.

O primeiro método "connect()" é usado para estabelecer uma conexão com o banco de dados Redis, utilizando as informações de configuração do objeto "redisEnv". 
Se a conexão ainda não foi estabelecida, uma nova instância do objeto "redis" é criada com as informações de configuração fornecidas,
e armazenada na variável estática "_connection" da classe. O método imprime uma mensagem "Redis is connected" no console para indicar que a conexão foi bem-sucedida.
O segundo método estático "connection()" é usado para obter a conexão ativa com o Redis. Se a conexão ainda não foi estabelecida,
uma exceção é lançada com a mensagem "Redis is not connected". Caso contrário, a conexão ativa é retornada.
Essa classe é útil para gerenciar uma única conexão com o Redis em um aplicativo Node.js, garantindo que apenas uma conexão seja estabelecida
por instância do aplicativo e facilitando o acesso à conexão em outras partes do código. */
