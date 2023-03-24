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

/* Este código define uma classe chamada DeleteTaskUseCase, que é responsável por deletar uma tarefa do banco de dados. Ele recebe como parâmetros um objeto TasksRepository e um objeto CacheRepository na sua criação. A classe possui um método chamado execute que recebe o ID da tarefa a ser deletada e executa as seguintes ações:

Chama o método delete do objeto TasksRepository para deletar a tarefa com o ID fornecido.
Chama o método delete do objeto CacheRepository para deletar do cache a tarefa com a chave task-${id}, bem como as chaves "tasks" e "user".
Retorna undefined. */
