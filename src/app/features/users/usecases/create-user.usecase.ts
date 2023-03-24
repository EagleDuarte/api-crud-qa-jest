import { User } from "../../../models/user";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserDTO {
  name: string;
  pass: string;
}

export class CreateUserUseCase {
  constructor(
    private repository: UserRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute(data: CreateUserDTO) {
    const user = new User(data.name, data.pass);

    const result = await this.repository.create(user);
    await this.cacheRepository.set(`user-${result.id}`, result);
    await this.cacheRepository.delete("user");
    await this.cacheRepository.delete("tasks");

    return result.toJson();
  }
}

/* Este código define a classe CreateUserUseCase, que é responsável por executar a criação de um novo usuário na aplicação. Essa classe recebe dois parâmetros 
no construtor: repository e cacheRepository. O primeiro é uma instância da classe UserRepository, que é responsável por persistir os dados do usuário no banco de dados, 
e o segundo é uma instância da classe CacheRepository, que é responsável por lidar com o cache da aplicação.

A classe CreateUserUseCase define um método chamado execute, que recebe um objeto data do tipo CreateUserDTO, contendo o nome e senha do usuário a ser criado. Dentro do
 método execute, é criado um novo objeto User com os dados recebidos, e então é chamado o método create da instância do UserRepository passada no construtor, que persiste 
 os dados do usuário no banco de dados e retorna um objeto User atualizado com o ID gerado pelo banco.
Em seguida, o método execute realiza algumas operações de cache: primeiro, o usuário recém-criado é armazenado em cache utilizando a chave user-${result.id}; em seguida,
 as chaves user e tasks são removidas do cache, para que os dados sejam atualizados na próxima vez que forem requisitados.
Por fim, o método execute retorna um objeto JSON contendo os dados do usuário criado. */
