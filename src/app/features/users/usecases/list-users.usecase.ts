import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class ListUsersUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get("users");
    if (cachedList) {
      return cachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map((item) => item.toJson());

    await this.cacheRepository.set("users", resultJson);

    return resultJson;
  }
}

/* Este código implementa a classe ListUsersUseCase, que é responsável por listar todos os usuários cadastrados. A classe recebe dois parâmetros em seu construtor: 
uma instância da classe UserRepository e uma instância da classe CacheRepository.

O método execute() da classe primeiro tenta obter a lista de usuários armazenada em cache, utilizando o método get() da classe CacheRepository. Se a lista existir no cache,
ela é retornada. Caso contrário, é realizada uma consulta ao banco de dados, utilizando o método list() da classe UserRepository, e o resultado é mapeado para um array de 
objetos JSON, utilizando o método toJson() de cada usuário.
Em seguida, a lista obtida é armazenada no cache, utilizando o método set() da classe CacheRepository, para que as próximas chamadas possam ser atendidas de forma mais rápida.
Por fim, a lista é retornada em formato JSON.  */