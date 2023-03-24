import { v4 as createUuid } from "uuid";
import { User } from "./user";

export class Tasks {
  private _id: string;

  constructor(
    private _description: string,
    private _detail: string,
    private _user: User,
    private _arquivada?: boolean
  ) {
    this._id = createUuid();
  }

  public get description() {
    return this._description;
  }

  public get detail() {
    return this._detail;
  }

  public get arquivada() {
    return this._arquivada;
  }

  public get id() {
    return this._id;
  }

  public get user() {
    return this._user;
  }

  public toJson() {
    return {
      id: this._id,
      description: this._description,
      detail: this._detail,
      user: this._user,
      arquivada: this._arquivada,
    };
  }

  public static create(
    id: string,
    description: string,
    detail: string,
    user: User
  ) {
    const tasks = new Tasks(description, detail, user);
    tasks._id = id;

    return tasks;
  }
}

/* O código define uma classe chamada Tasks, que representa uma tarefa a ser realizada por um usuário. A classe possui propriedades como descrição, detalhes, 
um usuário atribuído à tarefa e um status de arquivo (opcional), bem como um identificador exclusivo gerado automaticamente.
A classe também possui métodos getter para acessar as propriedades privadas e um método toJson que retorna um objeto literal contendo as propriedades da instância da classe
em formato JSON.
Além disso, a classe possui um método estático create que retorna uma nova instância da classe Tasks com um ID específico definido. */
