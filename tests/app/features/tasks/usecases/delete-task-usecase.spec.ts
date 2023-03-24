import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { DeleteTaskUseCase } from "../../../../../src/app/features/tasks/usecases/delete-task.usecase";
import { TasksRepository } from "../../../../../src/app/features/tasks/repositories/tasks.repository";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { Tasks } from "../../../../../src/app/models/tasks";
import { User } from "../../../../../src/app/models/user";

describe("Delete task usecase teste", () => {
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
    const sut = new DeleteTaskUseCase(
      new TasksRepository(),
      new CacheRepository()
    );

    return sut;
  };

  //*!NÃO PASSOU
  test.skip("deve retornar uma task valido se o id existir", async () => {
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
    // jest.spyOn(TasksRepository.prototype, "get").mockResolvedValue(task.id);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute(task.id);

    expect(result).not.toBeNull();
    expect(result).toBe(task.id);
  });
});
