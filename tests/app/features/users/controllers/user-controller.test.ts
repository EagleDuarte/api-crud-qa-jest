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
