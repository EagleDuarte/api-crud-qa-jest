import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class ListUsersUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get("users");
    if (cachedList) {
      return cachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map((item) => item.toJson());

    await this.cacheRepository.set("users", resultJson);

    return resultJson;
  }
}
