import { Request, Response, NextFunction } from "express";

export const loggedtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("List all tasks.");
  next();
};

/* Este código importa três tipos de módulos do pacote "express": "Request", "Response" e "NextFunction". Em seguida, o código define uma função chamada "loggedtMiddleware" 
que recebe três parâmetros: "req" (a solicitação HTTP), "res" (a resposta HTTP) e "next" (uma função que deve ser chamada para passar o controle para o próximo middleware na
sequência).

O objetivo dessa função é registrar no console a mensagem "List all tasks." e, em seguida, chamar a função "next()" para permitir que o controle seja passado para o próximo
middleware na sequência, que pode ser outro middleware ou a função de tratamento final para a solicitação HTTP.
Esse middleware não faz nenhuma alteração na solicitação ou resposta HTTP, mas é útil para fins de registro e rastreamento de solicitações HTTP. */