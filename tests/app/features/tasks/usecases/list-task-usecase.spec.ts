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

  test("Must return an task list from DB.", async () => {
    const sut = makeSut();

    // jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute();

    expect(result).not.toBeNull();
    expect(typeof result).toBe("object");
  });

  test("Must return an task list if it is on cache.", async () => {
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

/* Este código é um teste para um caso de uso (use case) chamado "ListTasksUseCase". Esse caso de uso utiliza um repositório de tarefas (TasksRepository) e um repositório de cache (CacheRepository). O teste verifica se a função execute() retorna uma lista de tarefas que não seja nula e do tipo objeto.

O teste tem duas partes, uma que verifica se a lista de tarefas é retornada do banco de dados (DB) e outra que verifica se a lista de tarefas é retornada do cache. Para testar o segundo cenário, o teste usa o método jest.spyOn() para substituir o método get() do CacheRepository por uma função que retorna um objeto JSON de usuário.
O código também possui uma configuração antes e depois de todos os testes para abrir e fechar uma conexão com o banco de dados. E antes de cada teste, é chamado o método jest.restoreAllMocks() para limpar todos os mocks definidos em testes anteriores. Por fim, o código usa uma função makeSut() para instanciar o caso de uso ListTasksUseCase e retornar o objeto instanciado para uso nos testes. */