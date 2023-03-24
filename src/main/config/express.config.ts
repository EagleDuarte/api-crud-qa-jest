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
