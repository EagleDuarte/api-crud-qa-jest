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

/* Esse código define uma classe chamada CreateTaskUseCase que implementa a lógica de negócios para a criação de uma nova tarefa no sistema. Ele espera dois argumentos em seu
construtor: um repositório para manipular as tarefas no banco de dados e um repositório de cache para armazenar temporariamente as informações da tarefa.
O execute método cria uma nova instância de Tasks a partir dos dados fornecidos na interface CreateTaskDTO. Em seguida, ele chama o método create do repositório de tarefas,
que salva a tarefa no banco de dados e retorna um objeto Tasks.
O método também atualiza o cache, armazenando a nova tarefa com a chave task-${result.id}. Em seguida, ele deleta os caches relacionados às tarefas e usuários para que as 
informações possam ser atualizadas no próximo acesso. 
Finalmente, ele retorna um objeto JSON que representa a nova tarefa criada. */
