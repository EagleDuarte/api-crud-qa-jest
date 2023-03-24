import { Tasks } from "../../models/tasks";
import { User } from "../../models/user";

export const userList = [
  new User("user1@teste.com", "1111"),
  new User("user2@teste.com", "2222"),
  new User("user3@teste.com", "3333"),
];

const user1 = userList.find((user) => user.name === "user1@teste.com");
const user2 = userList.find((user) => user.name === "user2@teste.com");

if (!user1) {
  throw new Error("Usuário não encontrado: user1@teste.com");
}

if (!user2) {
  throw new Error("Usuário não encontrado: user2@teste.com");
}

export const tasksList = [
  new Tasks("testing task one", "testing task one", user1),
  new Tasks("testing task two", "testing task two", user2),
];

/* O código acima exporta duas constantes: tasksList e userList.
- tasksList é um array de objetos da classe Tasks, com duas tarefas de teste, 
cada uma com um título e uma descrição.
- userList é um array de objetos da classe User, com dois usuários de teste, cada um com um e-mail e uma senha. 
Esses objetos são usados para realizar testes em outras partes do código ou para inicializar o estado do sistema. */
