import { Request, Response, NextFunction } from "express";

export const actionsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Alright, middleware running!");

  next();
};

/* Este código define uma função de middleware chamada "actionsMiddleware" que recebe três parâmetros: "req" (a solicitação HTTP), "res" (a resposta HTTP) e "next" 
(uma função que deve ser chamada para passar o controle para o próximo middleware na sequência).

O objetivo dessa função é registrar no console a mensagem "Alright, middleware running!" e, em seguida, chamar a função "next()" para permitir que o controle seja passado 
para o próximo middleware na sequência, que pode ser outro middleware ou a função de tratamento final para a solicitação HTTP.
Esse middleware não faz nenhuma alteração na solicitação ou resposta HTTP, mas pode ser usado para executar algumas ações adicionais antes ou depois de outros middlewares 
ou funções de tratamento. */