import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const tasksRoutes = Router();

tasksRoutes.get("/", new TasksController().list);
tasksRoutes.get("/:id", new TasksController().get);
tasksRoutes.post("/", new TasksController().create);
tasksRoutes.delete("/:id", new TasksController().delete);
tasksRoutes.put("/:id", new TasksController().update);
// tasksRoutes.put("/:id", new TasksController().arquivar);

export { tasksRoutes };

/* Este código define as rotas para uma API de gerenciamento de tarefas e usa o framework Express.js para definir as rotas HTTP. As rotas definidas são:

GET /: retorna a lista de todas as tarefas;
GET /:id: retorna uma tarefa específica com o ID fornecido;
POST /: cria uma nova tarefa;
DELETE /:id: exclui uma tarefa com o ID fornecido;
PUT /:id: atualiza uma tarefa com o ID fornecido.
As rotas são mapeadas para seus respectivos métodos em uma instância de TasksController, que é responsável por manipular as solicitações HTTP
e gerenciar a interação com a camada de dados da aplicação. */