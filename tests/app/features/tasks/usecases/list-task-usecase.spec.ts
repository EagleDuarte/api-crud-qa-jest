import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { ListTasksUseCase } from "../../../../../src/app/features/tasks/usecases/list-tasks.usecase";
import { TasksRepository } from "../../../../../src/app/features/tasks/repositories/tasks.repository";
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
    const sut = new ListTasksUseCase(
      new TasksRepository(),
      new CacheRepository()
    );

    return sut;
  };

  test("deve retornar uma lista de tasks do DB", async () => {
    const sut = makeSut();

    // jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute();

    expect(result).not.toBeNull();
    expect(typeof result).toBe("object");
  });

  test("deve retornar uma lista de tasks caso esteja em cache", async () => {
    const sut = makeSut();

    const user = new User("nome@teste.com", "1234");
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValue(user.toJson());

    const result = await sut.execute();

    expect(result).not.toBeNull();
    expect(typeof result).toBe("object");
    expect(result.id).toBe(user.id);
  });
});
