import express from "express";
import cors from "cors";
import { tasksRoutes } from "../../app/features/tasks/routes/tasks.routes";
import { userRoutes } from "../../app/features/users/routes/user.routes";

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/tasks", tasksRoutes);
  app.use("/user", userRoutes);

  return app;
};

/* Este código define uma função chamada createServer que cria e configura um servidor Express. A função cria uma instância do Express e adiciona middlewares para permitir
 a análise de JSON e o uso de cors. Em seguida, ele adiciona rotas definidas nos módulos de roteamento de tarefas e usuários aos caminhos "/tasks" e "/user", respectivamente.
  Por fim, ele retorna a instância do Express configurada. */