import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { GetUserUseCase } from "../../../../../src/app/features/users/usecases/get-users.usecase";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { User } from "../../../../../src/app/models/user";

describe("Get user usecase teste", () => {
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
    const sut = new GetUserUseCase(new UserRepository(), new CacheRepository());

    return sut;
  };

  test.skip("Shall return a valid user if the id exists.", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "abc@teste.com",
      pass: "123",
    };
    const user = new User(userDTO.name, userDTO.pass);
    jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(user);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute(user.id);

    expect(result).not.toBeNull();
    expect(result.id).toBe(user.id);
  });

  test("Shall return null when the user doesn't exists.", async () => {
    const sut = makeSut();

    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute("");
    expect(result).toBeNull();
  });

  test("Shall return an user if he exists on cache.", async () => {
    const sut = makeSut();

    const user = new User("nome@teste.com", "1234");
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValue(user.toJson());

    const result = await sut.execute(user.id);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("id");
    expect(result.id).toBe(user.id);
  });
});

/* Este código contém testes para a classe GetUserUseCase, que é responsável por recuperar informações de um usuário.

A função makeSut cria uma instância da classe GetUserUseCase com as dependências UserRepository e CacheRepository.
O primeiro teste test.skip verifica se um usuário válido é retornado quando o ID existe no banco de dados. A função spyOn é usada para espionar o método get da classe UserRepository e retornar um usuário válido com os valores especificados. A função expect é usada para verificar se o resultado retornado contém um valor válido.
O segundo teste verifica se é retornado null quando o usuário não existe. Nesse caso, as funções get do CacheRepository e UserRepository são espionadas e ambas retornam null.
O terceiro teste verifica se o usuário é recuperado do cache quando ele existe lá. A função spyOn é usada para espionar o método get da classe CacheRepository e retornar um usuário válido em formato JSON. A função expect é usada para verificar se o resultado retornado contém um valor válido. */
