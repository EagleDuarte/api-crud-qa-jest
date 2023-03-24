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
