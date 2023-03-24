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
    const user = new User("dev@teste.com", "dev123");

    const userRepository = new UserRepository();
    await userRepository.create(user);

    return user;
  };

  test("deve retornar 200 se existir lista de usuários", async () => {
    const app = makeSut();
    const user = await createUser();
    const result = await request(app).get("/user/").send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("deve retornar 200 se o usuário existir", async () => {
    const app = makeSut();
    const user = await createUser();
    const result = await request(app)
      .get("/user/" + user.id)
      .send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("deve retornar 404 se o usuário não existir id", async () => {
    const app = makeSut();
    const result = await request(app).get("/user/abc").send();

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(404);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("deve retornar 201 quando criar um usuário", async () => {
    const app = makeSut();
    const user = {
      name: "dev@teste.com",
      pass: "dev123",
    };
    const result = await request(app).post("/user/").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(201);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("deve retornar 400 se não passar name ao criar usuário", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "dev123",
    };
    const result = await request(app).post("/user/").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("deve retornar 400 se não passar pass ao criar usuário", async () => {
    const app = makeSut();
    const user = {
      name: "dev@teste.com",
      pass: "",
    };
    const result = await request(app).post("/user/").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("deve retornar 201 quando o usuário logar", async () => {
    const app = makeSut();
    const user = {
      name: "dev@teste.com",
      pass: "dev123",
    };
    const result = await request(app).post("/user/login").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(201);
    expect(result).toHaveProperty("body.ok", true);
  });

  test("deve retornar 400 se não passar name ao logar", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "dev123",
    };
    const result = await request(app).post("/user/login").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });

  test("deve retornar 400 se não passar pass ao logar", async () => {
    const app = makeSut();
    const user = {
      name: "dev@teste.com",
      pass: "",
    };
    const result = await request(app).post("/user/login").send(user);

    expect(result).not.toBeNull();
    expect(result.status).toEqual(400);
    expect(result).toHaveProperty("body.ok", false);
  });
});
