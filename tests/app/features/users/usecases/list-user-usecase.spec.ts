import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import { ListUsersUseCase } from "../../../../../src/app/features/users/usecases/list-users.usecase";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
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
    const sut = new ListUsersUseCase(
      new UserRepository(),
      new CacheRepository()
    );

    return sut;
  };

  test("Shall return a list of user from database.", async () => {
    const sut = makeSut();

    // jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
    jest.spyOn(CacheRepository.prototype, "get").mockResolvedValue(null);

    const result = await sut.execute();

    expect(result).not.toBeNull();
    expect(typeof result).toBe("object");
  });

  test("Shall return a list of users if on cache.", async () => {
    const sut = makeSut();

    const user = new User("nome@teste.com", "1234");
    jest
      .spyOn(CacheRepository.prototype, "get")
      .mockResolvedValue(user.toJson());

    const result = await sut.execute();

    expect(result).not.toBeNull();
    expect(typeof result).toBe("object");
    expect(result.id).toBe(user.id);
  });
});

/* Este código testa o caso de uso de obter usuários da aplicação. O teste inclui a abertura e fechamento de conexões com o banco de dados, bem como a restauração de mocks entre cada teste.

O método makeSut() cria uma nova instância do caso de uso, injetando uma instância de UserRepository e CacheRepository.
O primeiro teste "Shall return a list of user from database." testa se o caso de uso retorna uma lista de usuários do banco de dados. Para isso, utiliza a função execute() e espera que o resultado não seja nulo e seja do tipo objeto.
O segundo teste "Shall return a list of users if on cache." testa se o caso de uso retorna uma lista de usuários do cache. Para isso, utiliza a função execute() e simula um usuário presente no cache, esperando que o resultado não seja nulo, seja do tipo objeto e tenha o mesmo id do usuário simulado. */