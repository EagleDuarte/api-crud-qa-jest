import { User } from "../../../models/user";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface LoginUserDTO {
  id: string;
  name: string;
  pass: string;
}

export class LoginUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: any) {
    const userCache = await this.cacheRepository.get(`user-${data.id}`);

    if (userCache) {
      return userCache;
    }

    const user = await this.repository.get(data.name);
    if (!user) {
      return null;
    }

    const userJson = user.toJson();
    await this.cacheRepository.set(`user-${user.id}`, userJson);

    return user.toJson();
  }
}
