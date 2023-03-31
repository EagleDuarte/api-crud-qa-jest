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

  test("Shall return a 404 status and 'This user doesn't existis' message, when the id doesn't exists.", async () => {
    const app = makeSut();
    jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
    const result = await request(app).get("/user/any_id").send({});

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({
      ok: false,
      message: "This user doesn't exists.",
    });
  });

  test("Shall return a 200 status and body with data.", async () => {
    const app = makeSut();
    // jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
    const result = await request(app).get("/user/").send({});

    expect(result.statusCode).toBe(200);
    expect(result).toHaveProperty("body.data");
  });
});

/* Este código contém um conjunto de testes para um endpoint "PUT" de uma API, que devem ser executados utilizando o framework Jest. O primeiro teste simula um cenário em que
o usuário com o ID informado não existe na base de dados, o que deve resultar em um status code 404 e uma mensagem de erro informando que o usuário não existe. 
O segundo teste verifica se a resposta da API contém um status code 200 e um objeto com a chave "data". Para executar os testes, é utilizado o framework Supertest para fazer
requisições à API. O método makeSut() cria uma instância do servidor express. Os testes também utilizam mocks para simular a chamada a métodos do repositório de usuários.
O código também importa as funções openConnection e closeConnection, que abrem e fecham uma conexão com o banco de dados. */
