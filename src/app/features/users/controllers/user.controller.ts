import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { success, serverError } from "../../../shared/util/response.helper";
import { ListUsersUseCase } from "../usecases/list-users.usecase";
import { GetUserUseCase } from "../usecases/get-users.usecase";
import { CreateUserUseCase } from "../usecases/create-user.usecase";
import { LoginUserUseCase } from "../usecases/login-user.usecase";

export class UserController {
  public async list(req: Request, res: Response) {
    try {
      const usecase = new ListUsersUseCase(
        new UserRepository(),
        new CacheRepository()
      );
      const result = await usecase.execute();
      return success(res, result, "User successfully listed");
    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecase = new GetUserUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      const result = await usecase.execute(id);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "This user doenst exists.",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "User successfully obtained.",
        data: result,
      });
    } catch (error: any) {
      return serverError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, pass } = req.body;

      const usecase = new CreateUserUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      if (!name) {
        return res.status(400).send({
          ok: false,
          message: "Name not provided.",
        });
      }

      if (!pass) {
        return res.status(400).send({
          ok: false,
          message: "Password not provided.",
        });
      }

      const result = await usecase.execute({
        name,
        pass,
      });

      return res.status(201).send({
        ok: true,
        message: "User successfully created.",
        data: result,
      });
    } catch (error: any) {
      return serverError(res, error);
    }
  }

  // public async update(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     const { name, pass } = req.body;

  //     const repository = new UserRepository();
  //     const result = await repository.get(id);

  //     if (!result) {
  //       return res.status(404).send({
  //         ok: false,
  //         message: "User não encontrado",
  //       });
  //     }

  //     const resultUpdate = repository.update(result, {
  //       name,
  //       pass,
  //     });

  //     return res.status(200).send({
  //       ok: true,
  //       message: "User atualizado com sucesso",
  //       data: resultUpdate,
  //     });
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

  public async login(req: Request, res: Response) {
    try {
      const { name, pass } = req.body;

      const usecase = new LoginUserUseCase(
        new UserRepository(),
        new CacheRepository()
      );

      // const repository = new UserRepository();
      // const result2 = await repository.get(name);

      if (!name) {
        return res.status(400).send({
          ok: false,
          message: "Name or password not provided.",
        });
      }

      if (!pass) {
        return res.status(400).send({
          ok: false,
          message: "Name or password not provided.",
        });
      }

      const result = await usecase.execute({
        name,
        pass,
      });

      return res.status(201).send({
        ok: true,
        message: "Successfully",
        data: result,
      });
    } catch (error: any) {
      return serverError(res, error);
    }
  }
}
