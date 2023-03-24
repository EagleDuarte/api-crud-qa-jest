import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { User } from "../../../models/user";
import { UserEntity } from "../../../shared/entities/user.entity";

interface UpdateUserDTO {
  name?: string;
  pass?: string;
}

export class UserRepository {
  private _repository = DatabaseConnection.connection.getRepository(UserEntity);

  public async list() {
    const result = await this._repository.find({
      relations: {
        tasks: true,
      },
    });

    const users = result.map((item) => {
      return this.mapEntityToModel(item);
    });

    return users;
  }

  private mapEntityToModel(item: UserEntity) {
    return User.create(item.id, item.name, item.pass);
  }

  public async get(name: string) {
    const result = await this._repository.findOne({
      where: {
        name,
      },
      relations: {
        tasks: true,
      },
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async getId(id: string) {
    const result = await this._repository.findOne({
      where: {
        id,
      },
      relations: {
        tasks: true,
      },
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async create(user: User) {
    const userEntity = this._repository.create({
      id: user.id,
      name: user.name,
      pass: user.pass,
    });
    const result = await this._repository.save(userEntity);

    return this.mapEntityToModel(result);
  }

  // public async update(userEntity: UserEntity, data: UpdateUserDTO) {
  //   if (data.name) {
  //     userEntity.name = data.name;
  //   }

  //   if (data.pass) {
  //     userEntity.pass = data.pass;
  //   }

  //   return await this._repository.save(userEntity);
  // }
}

/* Este é um código TypeScript que define uma classe chamada UserRepository que implementa as operações CRUD (create, read, update e delete) em um banco de dados
para a entidade User.
O repositório utiliza o ORM TypeORM para se comunicar com o banco de dados e, em particular, com a entidade UserEntity.

As funções públicas da classe são:

list(): recupera uma lista de todos os usuários do banco de dados, incluindo suas tarefas relacionadas.
get(name: string): recupera um usuário pelo nome, incluindo suas tarefas relacionadas.
getId(id: string): recupera um usuário pelo ID, incluindo suas tarefas relacionadas.
create(user: User): cria um novo usuário no banco de dados a partir do objeto User fornecido.
update(userEntity: UserEntity, data: UpdateUserDTO): atualiza os dados de um usuário no banco de dados com base no objeto UpdateUserDTO fornecido.
No entanto, a função update() está comentada e, portanto, não está sendo usada.

Há também uma função privada mapEntityToModel() que converte um objeto UserEntity recuperado do banco de dados em um objeto User do modelo de negócios. */
