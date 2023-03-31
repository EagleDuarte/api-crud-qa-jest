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

  test.skip("Shall return a valid task if the id exists.", async () => {
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
    // jest.spyOn(TasksRepository.prototype, "get").mockResolvedValue(task.id);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute(task.id);

    expect(result).not.toBeNull();
    expect(result).toBe(task.id);
  });
});

/* Este código é um conjunto de testes para a classe DeleteTaskUseCase que é responsável por deletar uma tarefa.

O teste em questão foi marcado com .skip, o que significa que ele será ignorado ao rodar os testes. Essa linha comentada (jest.spyOn(TasksRepository.prototype, "get").mockResolvedValue(task.id);) indicava que um método get da classe TasksRepository seria espionado (monitorado) e seu retorno seria fixado em um valor específico, que é o id da tarefa. Porém, essa linha foi comentada e, portanto, não será executada.
Esse teste espera que a função execute da classe DeleteTaskUseCase retorne o id da tarefa que foi deletada, mas esse comportamento não foi implementado na classe. */