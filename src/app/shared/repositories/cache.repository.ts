import { CacheConnection } from "../../../main/database/cache.connection";

export class CacheRepository {
  private repository = CacheConnection.connection;

  public async get(chave: string) {
    const result = await this.repository.get(chave);

    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  public async set(chave: string, data: any) {
    await this.repository.set(chave, JSON.stringify(data));
  }

  public async delete(chave: string) {
    await this.repository.del(chave);
  }
}

/* Este código importa a classe "CacheConnection" do arquivo "cache.connection.ts" e define a classe "CacheRepository".

A classe "CacheRepository" possui três métodos públicos assíncronos:

"get(chave: string)": Recebe uma chave como parâmetro e utiliza a conexão com o Redis armazenada na propriedade "repository" para buscar o valor correspondente a essa chave. Se o valor não existir, retorna null. Caso contrário, retorna o valor decodificado a partir do JSON.
"set(chave: string, data: any)": Recebe uma chave e um objeto como parâmetros, e utiliza a conexão com o Redis armazenada na propriedade "repository" para armazenar o objeto serializado em formato JSON, associado à chave fornecida.
"delete(chave: string)": Recebe uma chave como parâmetro e utiliza a conexão com o Redis armazenada na propriedade "repository" para deletar a chave e o valor associado a ela do cache.
Essa classe fornece métodos simples para manipulação de cache usando Redis, encapsulando o acesso ao Redis em uma camada separada e permitindo que o cache seja facilmente utilizado por outras partes do código. */
