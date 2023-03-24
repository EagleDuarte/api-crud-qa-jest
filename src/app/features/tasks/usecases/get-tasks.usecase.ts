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

/* Este código define a classe GetTasksUseCase, que é responsável por obter uma tarefa específica a partir do seu ID. Ele recebe como argumentos um objeto TasksRepository,
 que lida com a persistência dos dados de tarefas, e um objeto CacheRepository, que lida com o cache desses dados.
O método execute recebe um ID de tarefa como argumento e verifica se a tarefa já está em cache. Se sim, ele retorna a tarefa armazenada em cache. Caso contrário, 
ele obtém a tarefa a partir do repositório, verifica se ela existe, a converte para o formato JSON e a armazena em cache antes de retorná-la. */
