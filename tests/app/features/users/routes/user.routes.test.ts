import { createServer } from "../../../../../src/main/config/express.config";
import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import request from "supertest";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";

const makeSut = (): Express.Application => {
  const sut = createServer();
  return sut;
};

describe("PUT - ", () => {
  beforeAll(async () => await openConnection());
  afterAll(async () => await closeConnection());

  test("deve retornar status 404 e mensagem 'O User não existe' quando o id for inexistente", async () => {
    const app = makeSut();
    jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
    const result = await request(app).get("/user/any_id").send({});

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({
      ok: false,
      message: "O User não existe",
    });
  });

  test("deve retornar status 200 e  body com data", async () => {
    const app = makeSut();
    // jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
    const result = await request(app).get("/user/").send({});

    expect(result.statusCode).toBe(200);
    expect(result).toHaveProperty("body.data");
  });
});
