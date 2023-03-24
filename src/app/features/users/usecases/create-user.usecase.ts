import { User } from "../../../models/user";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserDTO {
  name: string;
  pass: string;
}

export class CreateUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: CreateUserDTO) {
    const user = new User(data.name, data.pass);

    const result = await this.repository.create(user);
    await this.cacheRepository.set(`user-${result.id}`, result);
    await this.cacheRepository.delete("user");
    await this.cacheRepository.delete("tasks");

    return result.toJson();
  }
}
