import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { User } from "../../../models/user";
import { Tasks } from "../../../models/tasks";

export class DeleteTaskUseCase {
  constructor(
    private repository: TasksRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(id: string) {
    await this.repository.delete(id);
    await this.cacheRepository.delete(`task-${id}`);
    await this.cacheRepository.delete("tasks");
    await this.cacheRepository.delete("user");

    return;
  }
}
