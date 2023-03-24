import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";

import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { CreateUserUseCase } from "../../../../../src/app/features/users/usecases/create-user.usecase";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { User } from "../../../../../src/app/models/user";

describe("Create user usecase tests", () => {
  beforeAll(async () => {
    await openConnection();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(UserRepository.prototype, "get").mockResolvedValue(null);
  });

  const makeSut = () => {
    const sut = new CreateUserUseCase(
      new UserRepository(),
      new CacheRepository()
    );

    return sut;
  };

  test("Shall return the information of a new user when creating sucesfully.", async () => {
    const sut = makeSut();

    const user = {
      name: "dev@teste.com",
      pass: "dev123",
    };

    jest
      .spyOn(UserRepository.prototype, "create")
      .mockResolvedValue(new User(user.name, user.pass));

    jest.spyOn(CacheRepository.prototype, "delete").mockResolvedValue();

    const result = await sut.execute(user);

    expect(result).not.toBeNull();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("name", user.name);
    expect(result).toHaveProperty("pass", user.pass);
  });
});

/* Este é um conjunto de testes para o caso de uso de criação de usuário. As funções beforeAll() e afterAll() são executadas antes e depois de todos os testes, respectivamente, e abrem e fecham uma conexão com um banco de dados. A função beforeEach() é executada antes de cada teste e restaura todas as chamadas simuladas (mocks) e faz com que a função get() do UserRepository retorne null.

A função makeSut() cria uma instância do caso de uso CreateUserUseCase, que recebe uma instância do UserRepository e do CacheRepository.
O teste em si verifica se as informações de um novo usuário são retornadas corretamente ao chamar a função execute() do caso de uso. A função execute() recebe um objeto user com as propriedades name e pass. A chamada spyOn(UserRepository.prototype, "create") simula a função create() do UserRepository para retornar uma instância de usuário com as informações de name e pass passadas. A chamada spyOn(CacheRepository.prototype, "delete") simula a função delete() do CacheRepository para que não seja chamada durante o teste.
Por fim, o teste verifica se o resultado retornado pela função execute() não é nulo, está definido, e possui as propriedades name e pass correspondentes aos valores passados no objeto user.*/