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
