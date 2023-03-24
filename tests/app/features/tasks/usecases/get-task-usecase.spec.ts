import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { GetTasksUseCase } from "../../../../../src/app/features/tasks/usecases/get-tasks.usecase";
import { TasksRepository } from "../../../../../src/app/features/tasks/repositories/tasks.repository";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { Tasks } from "../../../../../src/app/models/tasks";
import { User } from "../../../../../src/app/models/user";

describe("Get task usecase teste", () => {
  beforeAll(async () => {
    await openConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const makeSut = () => {
    const sut = new GetTasksUseCase(
      new TasksRepository(),
      new CacheRepository()
    );

    return sut;
  };

  test("deve retornar uma task valido se o id existir", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "dev@teste.com",
      pass: "dev123",
    };

    const user = new User(userDTO.name, userDTO.pass);

    const taskDTO = {
      description: "teste",
      detail: "teste",
      user: user,
    };

    const task = new Tasks(taskDTO.description, taskDTO.detail, taskDTO.user);

    jest.spyOn(TasksRepository.prototype, "get").mockResolvedValue(task);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute(task.id);

    expect(result).not.toBeNull();
    expect(result.id).toBe(task.id);
  });

  test("deve retornar null quando não existir task", async () => {
    const sut = makeSut();

    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(TasksRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute("fbc2572a-c0d2-4580-a54a-ab5b860f2695");
    expect(result).toBeNull();
  });

  test("deve retornar uma task caso esteja em cache", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "dev@teste.com",
      pass: "dev123",
    };

    const user = new User(userDTO.name, userDTO.pass);

    const taskDTO = {
      description: "teste",
      detail: "teste",
      user: user,
    };

    const task = new Tasks(taskDTO.description, taskDTO.detail, taskDTO.user);

    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValue(task.toJson());

    const result = await sut.execute(task.id);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("id");
    expect(result.id).toBe(task.id);
  });
});
