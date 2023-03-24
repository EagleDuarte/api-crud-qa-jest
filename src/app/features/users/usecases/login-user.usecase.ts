import { User } from "../../../models/user";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface LoginUserDTO {
  id: string;
  name: string;
  pass: string;
}

export class LoginUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: any) {
    const userCache = await this.cacheRepository.get(`user-${data.id}`);

    if (userCache) {
      return userCache;
    }

    const user = await this.repository.get(data.name);
    if (!user) {
      return null;
    }

    const userJson = user.toJson();
    await this.cacheRepository.set(`user-${user.id}`, userJson);

    return user.toJson();
  }
}

/* Esse código define uma classe LoginUserUseCase, que é responsável por lidar com a lógica de login de um usuário. Essa classe recebe como entrada um objeto data que 
contém as propriedades id, name e pass. O construtor da classe recebe uma instância de UserRepository e uma instância de CacheRepository. O método execute da classe primeiro
verifica se há um cache do usuário com o id fornecido em data e, se houver, retorna o resultado do cache. Caso contrário, o método obtém o usuário do banco de dados por meio
do método get do UserRepository. Se o usuário não for encontrado, o método retorna null. Caso contrário, o método converte o objeto user em um objeto JSON usando o método 
toJson(), armazena o objeto JSON no cache e retorna o objeto JSON. */
