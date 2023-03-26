import request from "supertest";
import { createServer } from "../../../../../src/main/config/express.config";
import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { CreateTaskUseCase } from "../../../../../src/app/features/tasks/usecases/create-task.usecase";
import { CreateUserUseCase } from "../../../../../src/app/features/users/usecases/create-user.usecase";
import { LoginUserUseCase } from "../../../../../src/app/features/users/usecases/login-user.usecase";
import { UserController } from "../../../../../src/app/features/users/controllers/user.controller";
import { User } from "../../../../../src/app/models/user";
import { Tasks } from "../../../../../src/app/models/tasks";
import { TasksRepository } from "../../../../../src/app/features/tasks/repositories/tasks.repository";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { UpdateTaskUseCase } from "../../../../../src/app/features/tasks/usecases/update-task.usecase";

describe("Task controller tests", () => {
  beforeAll(async () => await openConnection());
  afterAll(async () => await closeConnection());

  const makeSut = () => {
    const sut = createServer();
    return sut;
  };

  test("Shall return a HTTP 200 when listing tasks", async () => {
    const app = makeSut();
    const result = await request(app).get("/tasks").send();

    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("mensagem", "Tasks successfull listed");
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 200 when this task doens't exists by id.", async () => {
    const app = makeSut();

    const result = await request(app)
      .get("/tasks/6752d6e8-0110-40ee-bcfa-0aacf8e98860")
      .send();

    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 404 the task doens't exists.", async () => {
    const app = makeSut();

    const result = await request(app)
      .get("/tasks/6752d6e8-0110-40ee-bcfa-0aacf8e98863")
      .send();

    expect(result.status).toBe(404);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Task not found");
  });

  test.skip("Shall return a HTTP 201 when a taks where created sucesfully.", async () => {
    const app = makeSut();

    const user = {
      id: "any-id-user",
      name: "user@test.com",
      pass: "user123",
    };

    const taskDTO = {
      id: "any-id",
      description: "teste",
      detail: "teste",
      user: User.create(user.id, user.name, user.pass),
    };

    const task = new Tasks(
      // taskDTO.id,
      taskDTO.description,
      taskDTO.detail,
      taskDTO.user
    );

    jest.spyOn(CreateTaskUseCase.prototype, "execute").mockResolvedValue(task);
    // jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(task.user);

    const result = await request(app).post("/tasks").send(task);

    expect(result.status).toBe(201);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    // expect(result.body).toHaveProperty("message", "User successfully created");
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 400 when creating a task without user.", async () => {
    const app = makeSut();

    const user = {
      name: "user@test.com",
      pass: "user123",
    };

    const taskDTO = {
      description: "teste",
      detail: "teste",
      user: new User(user.name, user.pass),
    };

    const task = new Tasks(
      taskDTO.description,
      taskDTO.detail,
      taskDTO.user
    ).toJson();

    jest.spyOn(CreateTaskUseCase.prototype, "execute").mockResolvedValue(task);

    const result = await request(app).post("/tasks").send(task);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty(
      "message",
      "User (idUser) not provided."
    );
  });

  test("Shall return a HTTP 400 when creating a task without description.", async () => {
    const app = makeSut();

    const user = {
      name: "user@test.com",
      pass: "user123",
    };

    const taskDTO = {
      description: "",
      detail: "teste",
      user: new User(user.name, user.pass),
    };

    const task = new Tasks(
      taskDTO.description,
      taskDTO.detail,
      taskDTO.user
    ).toJson();

    jest.spyOn(CreateTaskUseCase.prototype, "execute").mockResolvedValue(task);

    const result = await request(app).post("/tasks").send(task);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty(
      "message",
      "Description not provided."
    );
  });

  test("Shall return a HTTP 400 when creating tasks without detail.", async () => {
    const app = makeSut();

    const user = {
      name: "user@test.com",
      pass: "user123",
    };

    const taskDTO = {
      description: "teste",
      detail: "",
      user: new User(user.name, user.pass),
    };

    const task = new Tasks(
      taskDTO.description,
      taskDTO.detail,
      taskDTO.user
    ).toJson();

    jest.spyOn(CreateTaskUseCase.prototype, "execute").mockResolvedValue(task);

    const result = await request(app).post("/tasks").send(task);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Detail not provided.");
  });

  test.skip("Shall return a HTTP 200 when getting a task by id.", async () => {
    const app = makeSut();

    // const user = {
    //   name: "user@test.com",
    //   pass: "user123",
    // };

    // jest
    //   .spyOn(LoginUserUseCase.prototype, "execute")
    //   .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app)
      .delete("/tasks/6752d6e8-0110-40ee-bcfa-0aacf8e98860")
      .send();

    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("message", "Task successfully deleted.");
    // expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 200 when doing gets in the task list.", async () => {
    const app = makeSut();

    const result = await request(app).get("/tasks/").send();

    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 200 when the task where updated.", async () => {
    const app = makeSut();

    const user = {
      id: "any-id-user",
      name: "user@test.com",
      pass: "user123",
    };

    const taskDTO = {
      id: "any-id",
      description: "teste",
      detail: "teste",
      arquivada: false,
      user: User.create(user.id, user.name, user.pass),
    };

    // jest.spyOn(UpdateTaskUseCase .prototype, "execute").mockResolvedValue(taskDTO);
    const result = await request(app).put(`/tasks/${taskDTO.id}`).send(taskDTO);

    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty(
      "message",
      "Task updated sucesfully."
    );
  });

  test("Shall return a HTTP 404 when the taks where not found when deleting.", async () => {
    const app = makeSut();

    const user = {
      id: "any-id-user",
      name: "user@test.com",
      pass: "user123",
    };

    const taskDTO = {
      id: "any-id",
      description: "teste",
      detail: "teste",
      user: User.create(user.id, user.name, user.pass),
    };

    const result = await request(app).delete(`/tasks/${taskDTO.id}`).send();

    expect(result.status).toBe(404);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Tasks not provided.");
  });
});

/* Este é um arquivo de teste para um controlador de tarefas. O teste se concentra em verificar o comportamento do controlador de tarefas
 em diferentes situações, como listar tarefas, criar tarefas com ou sem informações válidas e recuperar tarefas pelo seu ID. 
 O código usa o framework Jest para escrever testes, o supertest para testar APIs HTTP e um banco de dados MongoDB para armazenar as 
 informações da tarefa. As funções de criar e fechar conexão com o banco de dados são fornecidas para garantir que os testes sejam 
 executados em um ambiente limpo e isolado. Alguns testes usam o mock para substituir a implementação real de algumas funções por um
  comportamento pré-determinado que permite testar o controlador de tarefas de forma mais confiável e isolada.
*/
