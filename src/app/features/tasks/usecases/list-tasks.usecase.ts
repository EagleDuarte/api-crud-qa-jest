import { Tasks } from "../../../models/tasks";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";

export class ListTasksUseCase {
  constructor(
    private repository: TasksRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get("tasks");
    if (cachedList) {
      return cachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map((item) => item.toJson());

    await this.cacheRepository.set("tasks", resultJson);

    return resultJson;
  }
}

/* Este código exporta uma classe chamada ListTasksUseCase, que é responsável por listar todas as tarefas existentes. O construtor recebe dois parâmetros: um repositório de
tarefas e um repositório de cache.
A função execute é assíncrona e não recebe nenhum parâmetro. A primeira coisa que ela faz é verificar se a lista de tarefas já está armazenada em cache. Se estiver, 
ela retorna o resultado armazenado em cache.
Se a lista de tarefas não estiver em cache, a função obtém a lista de tarefas a partir do repositório de tarefas e converte cada item em JSON. Em seguida, ela armazena a 
lista em cache e retorna o resultado. */
