import { v4 as createUuid } from "uuid";

export class User {
  private _id: string;

  constructor(private _name: string, private _pass: string) {
    this._id = createUuid();
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get pass() {
    return this._pass;
  }

  public set pass(pass: string) {
    this._pass = pass;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      id: this._id,
      name: this._name,
      pass: this._pass,
    };
  }

  public static create(id: string, name: string, pass: string) {
    const user = new User(name, pass);
    user._id = id;

    return user;
  }
}

/* Este código é uma classe chamada User, que tem os atributos privados _id, _name e _pass e métodos públicos name(), set name(), pass(), set pass(), id() e toJson(). 
O construtor da classe é chamado quando um novo objeto User é criado e recebe como parâmetros name e pass, que são usados para inicializar _name e _pass, 
respectivamente. _id é gerado automaticamente usando a biblioteca uuid e _id, _name e _pass podem ser acessados através dos métodos getters id(), name() e pass()
respectivamente. Além disso, a classe tem um método estático create() que cria uma nova instância de User com um id especificado. O método toJson() retorna um objeto com as 
propriedades id, name e pass */