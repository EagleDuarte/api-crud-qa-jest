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

/* Este é um conjunto de testes automatizados para a classe GetTasksUseCase.

O objetivo desta classe é obter as tarefas do banco de dados ou do cache e retornar as tarefas para o usuário. O primeiro teste tem como objetivo verificar se é possível obter uma tarefa do banco de dados com base em um ID de tarefa válido e existente. O segundo teste é destinado a verificar se a função retorna um valor nulo quando o ID da tarefa não existe no banco de dados. O terceiro teste verifica se a função é capaz de obter uma tarefa do cache com base em um ID válido de tarefa existente.
Para a execução dos testes, são utilizados objetos mock para as classes TasksRepository e CacheRepository, que são usadas para acessar os dados de tarefa no banco de dados e no cache, respectivamente. Além disso, o método makeSut() é usado para criar uma instância da classe GetTasksUseCase com as classes TasksRepository e CacheRepository fornecidas como parâmetros.
Os testes são executados com o uso da biblioteca Jest, que permite a criação de testes automatizados para JavaScript. O método beforeEach() é usado para restaurar todos os mocks antes de cada teste, para que cada teste seja executado com mocks limpos. O método beforeAll() é usado para abrir uma conexão com o banco de dados antes da execução dos testes, e o método afterAll() é usado para fechar a conexão com o banco de dados após a execução dos testes. */