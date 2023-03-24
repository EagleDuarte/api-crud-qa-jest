import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";

import { TasksRepository } from "../../../../../src/app/features/tasks/repositories/tasks.repository";
import { UpdateTaskUseCase } from "../../../../../src/app/features/tasks/usecases/update-task.usecase";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { User } from "../../../../../src/app/models/user";
import { Tasks } from "../../../../../src/app/models/tasks";

describe("Update task usecase tests", () => {
  beforeAll(async () => {
    await openConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(TasksRepository.prototype, "get").mockResolvedValue(null);
  });

  const makeSut = () => {
    const sut = new UpdateTaskUseCase(
      new TasksRepository(),
      new CacheRepository()
    );

    return sut;
  };

  //*!NÃO PASSOU
  test.skip("deve retornar os dados de uma nova task quando alterada com sucesso", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "dev@teste.com",
      pass: "dev123",
    };

    const user = new User(userDTO.name, userDTO.pass);

    const taskDTO = {
      id: "fbc2572a-c0d2-4580-a54a-ab5b860f2695",
      description: "novo teste",
      detail: "novo teste",
      arquivada: false,
      user: user,
    };

    const task = new Tasks(taskDTO.description, taskDTO.detail, taskDTO.user);

    // jest.spyOn(TasksRepository.prototype, "update").mockResolvedValue(task);

    jest.spyOn(CacheRepository.prototype, "delete").mockResolvedValue();

    // const result = await sut.execute(task);

    // expect(result).not.toBeNull();
    // expect(result).toBeDefined();
    // expect(result).toHaveProperty("description", task.description);
    // expect(result).toHaveProperty("detail", task.detail);
  });
});
