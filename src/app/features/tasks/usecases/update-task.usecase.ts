import { User } from "../../../models/user";
import { Tasks } from "../../../models/tasks";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { TasksEntity } from "../../../shared/entities/tasks.entity";

interface UpdateTaskDTO {
  id: string;
  description: string;
  detail: string;
  arquivada: boolean;
  user?: User;
}

export class UpdateTaskUseCase {
  constructor(
    private repository: TasksRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: UpdateTaskDTO) {
    var task = await this.repository.get(data.id);

    if (!task) {
      return null;
    }

    (task.description as string) = data.description ?? task.description;
    (task.detail as string) = data.detail ?? task.detail;
    // (task.arquivada as boolean) = data.arquivada ?? task.arquivada;

    const result = await this.repository.update(task);
    await this.cacheRepository.delete(`task-${task.id}`);
    await this.cacheRepository.delete("tasks");

    return result;
  }
}

/*Este código define uma classe UpdateTaskUseCase que contém um método execute que atualiza uma tarefa com base em informações fornecidas no objeto UpdateTaskDTO.

O objeto UpdateTaskDTO possui as seguintes propriedades:

id: o ID da tarefa a ser atualizada
description: a nova descrição da tarefa (opcional)
detail: os novos detalhes da tarefa (opcional)
arquivada: o novo status de arquivo da tarefa (opcional)
user: o novo usuário associado à tarefa (opcional)
O método execute primeiro obtém a tarefa correspondente ao ID fornecido a partir do repositório e, em seguida, atualiza as propriedades da tarefa com base nas informações 
fornecidas em UpdateTaskDTO. Se nenhuma informação for fornecida para uma determinada propriedade, ela permanecerá com seu valor anterior. Em seguida, o método chama o método
update do repositório para salvar as alterações na tarefa.
Por fim, o método exclui a tarefa do cache para que ela seja atualizada na próxima vez que for solicitada e exclui a lista de tarefas do cache, já que pode ter mudado. 
O método retorna a tarefa atualizada. */
