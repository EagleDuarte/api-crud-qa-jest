import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", new UserController().list);
userRoutes.get("/:id", new UserController().get);
userRoutes.post("/", new UserController().create);
userRoutes.post("/login", new UserController().login);
// userRoutes.put("/:id", new UserController().update);

export { userRoutes };

/* Esse código define rotas para o recurso "usuário" em uma aplicação Node.js usando o framework Express. As rotas são definidas usando o 
método Router() do Express e são exportadas para serem usadas em outros lugares do código.

As rotas definidas são:

GET /: rota para listar todos os usuários, que chama o método list() do UserController.
GET /:id: rota para buscar um usuário pelo ID, que chama o método get() do UserController.
POST /: rota para criar um novo usuário, que chama o método create() do UserController.
POST /login: rota para autenticar um usuário, que chama o método login() do UserController.
PUT /:id: rota para atualizar um usuário existente, que está comentada neste código, mas poderia ser descomentada e chamaria o método
update() do UserController. */
