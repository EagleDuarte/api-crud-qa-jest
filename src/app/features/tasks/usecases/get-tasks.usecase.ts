import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";

export class GetTasksUseCase {
  constructor(
    private repository: TasksRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(id: string) {
    const taskCache = await this.cacheRepository.get(`task-${id}`);

    if (taskCache) {
      return taskCache;
    }

    const task = await this.repository.get(id);
    if (!task) {
      return null;
    }

    const taskJson = task.toJson();
    await this.cacheRepository.set(`task-${id}`, taskJson);

    return taskJson;
  }
}
