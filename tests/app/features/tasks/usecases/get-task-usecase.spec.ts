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

  test("Shall return a valid task when the user id exists.", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "user@test.com",
      pass: "user123",
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

  test("Shall return a null status when the tasks does not exists.", async () => {
    const sut = makeSut();

    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(TasksRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute("");
    expect(result).toBeNull();
  });

  test("Shall return a task if it is on database.", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "user@test.com",
      pass: "user123",
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
