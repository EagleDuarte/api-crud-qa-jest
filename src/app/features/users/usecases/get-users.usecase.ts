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
