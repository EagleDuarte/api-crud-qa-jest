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

describe("Get user by id - integration controller test", () => {
  beforeAll(async () => await openConnection());
  afterAll(async () => await closeConnection());

  const makeSut = () => {
    const sut = createServer();
    return sut;
  };

  beforeEach(async () => {
    const manager = DatabaseConnection.connection.manager;
    await manager.clear(UserEntity);
  });

  const createUser = async () => {
    const user = new User("user@test.com", "user123");

    const userRepository = new UserRepository();
    await userRepository.create(user);

    return user;
  };

  test("Shall return a 200 status if it is registered on the user list.", async () => {
    const app = makeSut();
    const user = await createUser();
    const result = await request(app).get("/user/").send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("Shall return a 200 status if the user doens't exists.", async () => {
    const app = makeSut();
    const user = await createUser();
    const result = await request(app)
      .get("/user/" + user.id)
      .send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("Shall return a 404 status if the user if doesn't exists.", async () => {
    const app = makeSut();
    const result = await request(app).get("/user/abc").send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall reteurn a 201 status when the user we're created.", async () => {
    const app = makeSut();
    const user = {
      name: "user@test.com",
      pass: "user123",
    };
    const result = await request(app).post("/user/").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(201);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("Shall return a 400 status if the name we're not provided when creating the user.", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "user123",
    };
    const result = await request(app).post("/user/").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall return a 400 status if the password we're not provided when creating the user.", async () => {
    const app = makeSut();
    const user = {
      name: "user@test.com",
      pass: "",
    };
    const result = await request(app).post("/user/").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall return a 201 status when the user log.", async () => {
    const app = makeSut();
    const user = {
      name: "user@test.com",
      pass: "user123",
    };
    const result = await request(app).post("/user/login").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(201);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("Shall return a 400 status if the name doens't log.", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "user123",
    };
    const result = await request(app).post("/user/login").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("Shall return a 400 status if the password doesn't log.", async () => {
    const app = makeSut();
    const user = {
      name: "user@test.com",
      pass: "",
    };
    const result = await request(app).post("/user/login").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });
});

/* Este é um conjunto de testes de integração para um controlador que lida com requisições de usuário em um sistema. Os testes são executados usando o framework de teste Jest.

O conjunto de testes inclui os seguintes testes:

Testa se o controlador retorna um código de status 200 quando um usuário está registrado na lista de usuários.
Testa se o controlador retorna um código de status 200 quando um usuário não existe.
Testa se o controlador retorna um código de status 404 quando um usuário não existe.
Testa se o controlador retorna um código de status 201 quando um usuário é criado.
Testa se o controlador retorna um código de status 400 se o nome do usuário não for fornecido durante a criação.
Testa se o controlador retorna um código de status 400 se a senha do usuário não for fornecida durante a criação.
Testa se o controlador retorna um código de status 201 quando o usuário fizer login.
Testa se o controlador retorna um código de status 400 se o nome do usuário não fizer login.
Testa se o controlador retorna um código de status 400 se a senha do usuário não fizer login.
O código começa inicializando e fechando a conexão com o banco de dados usando funções beforeAll e afterAll do Jest. Em seguida, define uma função de utilidade chamada makeSut, que cria uma instância do servidor.

O beforeEach é usado para limpar o banco de dados antes de cada teste.

Em seguida, há uma função de utilidade chamada createUser, que cria e salva um usuário no banco de dados usando um repositório de usuário.

Os testes usam a biblioteca supertest para fazer solicitações HTTP ao servidor criado pela função makeSut. Cada teste envolve uma solicitação HTTP diferente para o servidor e testa o código de status da resposta e as propriedades da resposta retornada. */