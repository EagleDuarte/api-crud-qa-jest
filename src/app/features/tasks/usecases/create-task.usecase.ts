import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { User } from "../../../models/user";
import { Tasks } from "../../../models/tasks";

interface CreateTaskDTO {
  description: string;
  detail: string;
  user: User;
  arquivada?: boolean;
}

export class CreateTaskUseCase {
  constructor(
    private repository: TasksRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: CreateTaskDTO) {
    const task = new Tasks(data.description, data.detail, data.user);

    const result = await this.repository.create(task);
    await this.cacheRepository.set(`task-${result.id}`, result);
    await this.cacheRepository.delete("tasks");
    await this.cacheRepository.delete("user");

    return result.toJson();
  }
}
