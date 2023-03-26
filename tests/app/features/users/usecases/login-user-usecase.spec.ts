import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { LoginUserUseCase } from "../../../../../src/app/features/users/usecases/login-user.usecase";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { User } from "../../../../../src/app/models/user";

describe("Login user usecase test", () => {
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
    const sut = new LoginUserUseCase(
      new UserRepository(),
      new CacheRepository()
    );
    return sut;
  };

  test("Shall return a valid user if the id exists.", async () => {
    const sut = makeSut();

    const userDTO = {
      name: "user@test.com",
      pass: "user123",
    };
    const user = new User(userDTO.name, userDTO.pass);
    jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(user);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute(user);

    expect(result).not.toBeNull();
    expect(result.name).toBe(user.name);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name", user.name);
    expect(result).toHaveProperty("pass", user.pass);
  });

  test("Shall return a null user when the user doen't exists.", async () => {
    const sut = makeSut();

    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute("");
    expect(result).toBeNull();
  });

  test("Shall return a user if he exists on cache.", async () => {
    const sut = makeSut();
    const user = new User("user@test.com", "user123");
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValue(user.toJson());

    const result = await sut.execute(user.id);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("id");
    expect(result.id).toBe(user.id);
  });
});

/* Este código é um conjunto de testes para o caso de uso "Login de Usuário". Ele usa o Jest como framework de testes e define três testes:

O primeiro teste verifica se um usuário válido é retornado se o ID existir. Ele também verifica se o usuário retornado tem todas as propriedades esperadas.
O segundo teste verifica se um usuário nulo é retornado quando o usuário não existe.
O terceiro teste verifica se um usuário é retornado se ele existir no cache. Ele também verifica se o usuário retornado tem o ID esperado.
Além disso, há também algumas configurações antes dos testes, como a abertura e fechamento da conexão com o banco de dados, restaurando todos os mocks e definindo a função "makeSut", que instancia o caso de uso a ser testado. */