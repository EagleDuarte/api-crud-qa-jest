import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { createServer } from "../../../../../src/main/config/express.config";
import request from "supertest";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connection";
import { UserEntity } from "../../../../../src/app/shared/entities/user.entity";
import { TasksEntity } from "../../../../../src/app/shared/entities/tasks.entity";
import { User } from "../../../../../src/app/models/user";
import { Tasks } from "../../../../../src/app/models/tasks";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { TasksRepository } from "../../../../../src/app/features/tasks/repositories/tasks.repository";

describe("Get task by id - integration controller test", () => {
  beforeAll(async () => await openConnection());
  afterAll(async () => await closeConnection());

  const makeSut = () => {
    const sut = createServer();
    return sut;
  };

  beforeEach(async () => {
    const manager = DatabaseConnection.connection.manager;
    await manager.clear(TasksEntity);
  });

  const createTask = async () => {
    const user = new User("user@test.com", "user123");
    const task = new Tasks("new test", "new test", user);

    const taskRepository = new TasksRepository();
    await taskRepository.create(task);

    return task;
  };

  test.skip("Shall return a 200 status, if it exists in the task list.", async () => {
    const app = makeSut();
    const task = await createTask();
    const result = await request(app).get("/tasks/").send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result).toHaveProperty("body.ok", true);
  });

  test.skip("Shall return a 200 status, when the task exists.", async () => {
    const app = makeSut();
    const task = await createTask();
    const result = await request(app)
      .get("/tasks/" + task.id)
      .send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("Shall return a 404 Shall return 404 if the task doens't exists. id", async () => {
    const app = makeSut();
    const result = await request(app).get("/tasks/abc").send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall return a 404 when creating a task without a existing user.", async () => {
    const app = makeSut();
    const user = new User("user@test.com", "user123");
    const result = await request(app).post("/tasks/").send({
      id: "any-id",
      description: "new test",
      detail: "new test",
      idUser: user.id,
    });

    expect(result).not.toBeNull();
    expect(result.status).toEqual(404);
    expect(result).toHaveProperty("body.ok", false);
    expect(result).toHaveProperty("body.message", "User doens't exists.");
  });

  test("Shall return a 400 if the description wasn't provided when creating the task.", async () => {
    const app = makeSut();
    const user = new User("user@test.com", "user123");
    const result = await request(app).post("/tasks/").send({
      id: "any-id",
      description: "",
      detail: "new test",
      idUser: user.id,
    });

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall return a 400 when not the detail wasn't provided when creating the task.", async () => {
    const app = makeSut();
    const user = new User("user@test.com", "user123");
    const result = await request(app).post("/tasks/").send({
      id: "any-id",
      description: "new test",
      detail: "",
      idUser: user.id,
    });

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall return a 400 if the detail we're not provided when creating the task.", async () => {
    const app = makeSut();
    const user = new User("user@test.com", "user123");
    const result = await request(app).post("/tasks/").send({
      id: "any-id",
      description: "new test",
      detail: "new test",
      idUser: "",
    });

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall return 404 if the task doens't exists.", async () => {
    const app = makeSut();
    const user = new User("user@test.com", "user123");
    const task = new Tasks("new test", "new test", user);
    const result = await request(app)
      .delete("/tasks/" + task.id)
      .send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("body.ok", false);
  });
});

/* Este codigo é um conjunto de testes de integração para o controlador de tarefas. Antes de cada teste, a base de dados é limpa. O código testa a criação, recuperação e exclusão de tarefas. Os testes são:

"Shall return a 200 status, if it exists in the task list." - testa se a rota "/tasks/" retorna um código de status 200 e uma resposta com propriedade "ok" igual a true.
"Shall return a 200 status, when the task exists" - testa se a rota "/tasks/:id" retorna um código de status 200 e uma resposta com propriedade "ok" igual a true.
"Shall return a 404 if the task doens't exists. id" - testa se a rota "/tasks/:id" retorna um código de status 404 e uma resposta com propriedade "ok" igual a false.
"Shall return a 404 when creating a task without a existing user." - testa se a rota "/tasks/" retorna um código de status 404 e uma resposta com propriedade "ok" igual a false e mensagem "User não existe" quando uma tarefa é criada sem um usuário existente.
"Shall return a 400 if the description wasn't provided when creating the task." - testa se a rota "/tasks/" retorna um código de status 400 e uma resposta com propriedade "ok" igual a false quando uma tarefa é criada sem descrição.
"Shall return a 400 if the details we're not provided when creating the task." - testa se a rota "/tasks/" retorna um código de status 400 e uma resposta com propriedade "ok" igual a false quando uma tarefa é criada sem detalhes.
"Shall return a 400 if the details we're not provided when creating the task." - testa se a rota "/tasks/" retorna um código de status 400 e uma resposta com propriedade "ok" igual a false quando uma tarefa é criada sem um usuário.
"Shall return a 404 if the task doens't exists." - testa se a rota "/tasks/:id" retorna um código de status 404 e uma resposta com propriedade "ok" igual a false quando uma tarefa é excluída e não existe na base de dados. */