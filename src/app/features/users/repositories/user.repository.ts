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
