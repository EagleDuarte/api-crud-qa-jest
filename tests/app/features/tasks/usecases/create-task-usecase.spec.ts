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

  test("Must return a new task when creating sucessfully.", async () => {
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

/* Este código é um conjunto de testes unitários para a classe CreateTaskUseCase, que é uma das classes do aplicativo responsável por criar uma nova tarefa. Ele importa as dependências necessárias para os testes, incluindo o repositório de tarefas, o repositório de cache, o modelo de usuário e o modelo de tarefas.

Os testes são escritos usando a biblioteca Jest e são organizados dentro de um bloco describe que descreve o caso de uso de criar uma tarefa. O bloco beforeAll é executado antes de todos os testes e inicia uma conexão com o banco de dados, enquanto o bloco afterAll é executado após todos os testes e encerra a conexão com o banco de dados.
O método makeSut é definido para criar uma instância do caso de uso CreateTaskUseCase, com os repositórios de tarefas e cache necessários. O teste principal testa se uma nova tarefa pode ser criada com sucesso, definindo um usuário e uma tarefa e verificando se as propriedades da tarefa criada correspondem às da tarefa definida. Este teste é executado usando o método execute do caso de uso e espera um resultado não nulo e definido. */
