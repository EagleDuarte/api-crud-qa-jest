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

  test.skip("Shall return data when a new task we're updated sucessfully.", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "user@test.com",
      pass: "user123",
    };

    const user = new User(userDTO.name, userDTO.pass);

    const taskDTO = {
      id: "",
      description: "testing description ...",
      detail: "testing detail ...",
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

/* Esse código descreve testes para o caso de uso de atualização de tarefas. Antes de cada teste, a função beforeEach é executada para restaurar todos os mocks e definir a função get do repositório de tarefas como retornando null. A função makeSut é usada para criar uma instância do caso de uso a ser testado.
O teste Shall return data when a new task we're updated sucessfully é criado, mas está comentado. Ele usa a função makeSut para criar uma instância do caso de uso, instancia um objeto user, um objeto taskDTO e um objeto task, e, em seguida, cria alguns mocks para as funções update e delete dos repositórios e executa o caso de uso. Finalmente, ele verifica se o resultado é não nulo, definido e se contém as propriedades description e detail. */