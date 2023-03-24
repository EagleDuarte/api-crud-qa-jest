import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class GetUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(id: string) {
    const userCache = await this.cacheRepository.get(`user-${id}`);

    if (userCache) {
      return userCache;
    }

    const user = await this.repository.getId(id);
    if (user == null) {
      return null;
    }

    const userJson = user.toJson();
    await this.cacheRepository.set(`user-${id}`, userJson);

    return userJson;
  }
}

/* Este código define a classe GetUserUseCase, que é usada para obter um usuário específico. Essa classe tem um construtor que recebe um repositório de usuário 
(UserRepository) e um repositório de cache (CacheRepository).

O método execute recebe um ID de usuário como parâmetro. Ele primeiro verifica se o usuário já está no cache, e se estiver, retorna o objeto de usuário armazenado no cache.
 Caso contrário, o método chama o método getId do repositório para buscar o usuário no banco de dados. Se o usuário existir, ele é convertido em um objeto JSON, armazenado 
 em cache e retornado. Se o usuário não existir, o método retorna null.*/
