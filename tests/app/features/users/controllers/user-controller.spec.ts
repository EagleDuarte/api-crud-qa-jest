import request from "supertest";
import { createServer } from "../../../../../src/main/config/express.config";
import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { CreateUserUseCase } from "../../../../../src/app/features/users/usecases/create-user.usecase";
import { LoginUserUseCase } from "../../../../../src/app/features/users/usecases/login-user.usecase";
import { UserController } from "../../../../../src/app/features/users/controllers/user.controller";
import { User } from "../../../../../src/app/models/user";

describe("User controller tests", () => {
  beforeAll(async () => await openConnection());
  afterAll(async () => await closeConnection());

  const makeSut = () => {
    const sut = createServer();
    return sut;
  };

  test("Shall return a HTTP 200 when listing users.", async () => {
    const app = makeSut();
    const result = await request(app).get("/user").send();

    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("mensagem", "User successfully listed");
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 200 when the user exists.", async () => {
    const app = makeSut();

    const result = await request(app)
      .get(`/user/0c9f7d5f-85e9-4921-90ec-f443b4cf01d1`)
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("message", "User successfully obtained");
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 400 when the user does not exists.", async () => {
    const app = makeSut();

    const result = await request(app)
      .get(`/user/0c9f7d5f-85e9-4921-90ec-f443b4cf01d5`)
      .send();

    expect(result.statusCode).toBe(404);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "O User não existe");
  });

  test("Shall return a HTTP 201 status when the user we're created sucessfully.", async () => {
    const app = makeSut();

    const user = {
      name: "user@test.com",
      pass: "user123",
    };

    jest
      .spyOn(CreateUserUseCase.prototype, "execute")
      .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app).post("/user").send(user);

    expect(result.status).toBe(201);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("message", "User successfully created");
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 400 status when users are created without name.", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "user123",
    };

    jest
      .spyOn(CreateUserUseCase.prototype, "execute")
      .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app).post("/user").send(user);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Name not provided");
  });

  test("Shall return a HTTP 400 status, when the user we're created without password.", async () => {
    const app = makeSut();
    const user = {
      name: "user@test.com",
      pass: "",
    };

    jest
      .spyOn(CreateUserUseCase.prototype, "execute")
      .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app).post("/user").send(user);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "pass not provided");
  });

  test("Shall return a HTTP 201 status when the user log sucessfully.", async () => {
    const app = makeSut();

    const user = {
      name: "user@test.com",
      pass: "user123",
    };

    jest
      .spyOn(LoginUserUseCase.prototype, "execute")
      .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app).post("/user/login").send(user);

    expect(result.status).toBe(201);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("message", "Successfully");
    expect(result.body).toHaveProperty("data");
  });

  test("Shall return a HTTP 400 when trying to log without a name.", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "user123",
    };

    jest
      .spyOn(LoginUserUseCase.prototype, "execute")
      .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app).post("/user/login").send(user);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Name or password not provided.");
  });

  test("Shall return a HTTP 400 when the user log without a password.", async () => {
    const app = makeSut();
    const user = {
      name: "user@test.com",
      pass: "",
    };

    jest
      .spyOn(LoginUserUseCase.prototype, "execute")
      .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app).post("/user/login").send(user);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Name or pass not provided");
  });

  test("Shall return a HTTP 501 when the login usecase generate exceptions.", async () => {
    const app = makeSut();

    const user = {
      name: "user@test.com",
      pass: "user123",
    };

    jest.spyOn(LoginUserUseCase.prototype, "execute").mockImplementation(() => {
      throw new Error("Error in the user test!");
    });

    const result = await request(app).post("/user/login").send(user);

    expect(result.statusCode).toBe(501);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty(
      "message",
      new Error("Error in the unity test!").toString()
    );
  });
});
