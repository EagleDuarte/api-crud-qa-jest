import { Tasks } from "../../../models/tasks";
import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { TasksEntity } from "../../../shared/entities/tasks.entity";
import { User } from "../../../models/user";

interface UpdateTasksDTO {
  description?: string;
  detail?: string;
  arquivada?: boolean;
  user?: User;
}

export class TasksRepository {
  private _repository =
    DatabaseConnection.connection.getRepository(TasksEntity);

  public async list() {
    const result = await this._repository.find({
      relations: {
        user: true,
      },
    });

    const tasks = result.map((item) => {
      return this.mapEntityToModel(item);
    });

    return tasks;
  }

  private mapEntityToModel(item: TasksEntity) {
    let user!: User;

    if (item.user) {
      user = User.create(item.user.id, item.user.name, item.user.pass);
    }

    return Tasks.create(item.id, item.description, item.detail, user);
  }

  public async get(id: string) {
    const result = await this._repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async create(tasks: Tasks) {
    const tasksEntity = this._repository.create({
      id: tasks.id,
      description: tasks.description,
      detail: tasks.detail,
      arquivada: tasks.arquivada,
      id_user: tasks.user?.id,
    });

    const result = await this._repository.save(tasksEntity);

    return this.mapEntityToModel(result);
  }

  // public async update(task: Tasks) {
  //   const result = await this._repository.update(
  //     {
  //       id: task.id,
  //     },
  //     {
  //       description: task.description,
  //       detail: task.detail,
  //       arquivada: task.arquivada,
  //     }
  //   );
  //   await this._repository.save({
  //     id: task.id,
  //     description: task.description,
  //     detail: task.detail,
  //     arquivada: task.arquivada,
  //   });

  //   return result.affected ?? 0;
  // }

  public async update(data: UpdateTasksDTO) {
    let tasksEntity!: TasksEntity;

    if (data.description) {
      tasksEntity.description = data.description;
    }

    if (data.detail) {
      tasksEntity.detail = data.detail;
    }

    if (data.user?.id) {
      tasksEntity.id_user = data.user.id;
    }

    return await this._repository.save(tasksEntity);
  }

  // public async arquivar(tasksEntity: TasksEntity, data: UpdateTasksDTO) {
  //   if (data.arquivada) {
  //     tasksEntity.arquivada = data.arquivada;
  //   }

  //   return await this._repository.save(tasksEntity);
  // }

  public async delete(id: string) {
    return await this._repository.delete({ id });
  }
}
