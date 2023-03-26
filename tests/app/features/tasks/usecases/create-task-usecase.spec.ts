import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";

import { TasksRepository } from "../../../../../src/app/features/tasks/repositories/tasks.repository";
import { CreateTaskUseCase } from "../../../../../src/app/features/tasks/usecases/create-task.usecase";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { User } from "../../../../../src/app/models/user";
import { Tasks } from "../../../../../src/app/models/tasks";

describe("Create task usecase tests", () => {
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
    const sut = new CreateTaskUseCase(
      new TasksRepository(),
      new CacheRepository()
    );

    return sut;
  };

  test("deve retornar os dados de uma nova task quando criar com sucesso", async () => {
    const sut = makeSut();

    const userDTO = {
      id: "any-id",
      name: "user@test.com",
      pass: "user123",
    };

    const user = User.create(userDTO.id, userDTO.name, userDTO.pass);

    const taskDTO = {
      description: "teste",
      detail: "teste",
      user: user,
    };

    const task = new Tasks(taskDTO.description, taskDTO.detail, taskDTO.user);

    jest.spyOn(TasksRepository.prototype, "create").mockResolvedValue(task);

    jest.spyOn(CacheRepository.prototype, "delete").mockResolvedValue();

    const result = await sut.execute(task);

    expect(result).not.toBeNull();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("description", task.description);
    expect(result).toHaveProperty("detail", task.detail);
  });
});
