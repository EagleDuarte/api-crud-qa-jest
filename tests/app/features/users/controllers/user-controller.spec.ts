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

  test("deve retornar HTTP 200 quando o listar users", async () => {
    const app = makeSut();
    const result = await request(app).get("/user").send();

    expect(result.status).toBe(200);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", true);
    expect(result.body).toHaveProperty("mensagem", "User successfully listed");
    expect(result.body).toHaveProperty("data");
  });

  test("deve retornar HTTP 200 quando existir user", async () => {
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

  test("deve retornar HTTP 400 quando não existir user", async () => {
    const app = makeSut();

    const result = await request(app)
      .get(`/user/0c9f7d5f-85e9-4921-90ec-f443b4cf01d5`)
      .send();

    expect(result.statusCode).toBe(404);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "O User não existe");
  });

  test("deve retornar HTTP 201 quando o user for criado com sucesso", async () => {
    const app = makeSut();

    const user = {
      name: "dev@teste.com",
      pass: "dev123",
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

  test("deve retornar HTTP 400 quando criar user sem name", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "dev123",
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

  test("deve retornar HTTP 400 quando criar user sem pass", async () => {
    const app = makeSut();
    const user = {
      name: "dev@teste.com",
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

  test("deve retornar HTTP 201 quando o user logar com sucesso", async () => {
    const app = makeSut();

    const user = {
      name: "dev@teste.com",
      pass: "dev123",
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

  test("deve retornar HTTP 400 quando logar user sem name", async () => {
    const app = makeSut();
    const user = {
      name: "",
      pass: "dev123",
    };

    jest
      .spyOn(LoginUserUseCase.prototype, "execute")
      .mockResolvedValue(new User(user.name, user.pass).toJson());

    const result = await request(app).post("/user/login").send(user);

    expect(result.status).toBe(400);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty("message", "Name or Pass not provided");
  });

  test("deve retornar HTTP 400 quando logar user sem pass", async () => {
    const app = makeSut();
    const user = {
      name: "dev@teste.com",
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

  test("deve retornar HTTP 501 quando o login usecase gerar excecao", async () => {
    const app = makeSut();

    const user = {
      name: "dev@teste.com",
      pass: "dev123",
    };

    jest.spyOn(LoginUserUseCase.prototype, "execute").mockImplementation(() => {
      throw new Error("Erro no teste unitario");
    });

    const result = await request(app).post("/user/login").send(user);

    expect(result.statusCode).toBe(501);
    expect(result.body).not.toBeNull();
    expect(result.body).toHaveProperty("ok", false);
    expect(result.body).toHaveProperty(
      "message",
      new Error("Erro no teste unitario").toString()
    );
  });
});
