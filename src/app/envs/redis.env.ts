import "dotenv/config";

export const redisEnv = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT!),
  usarname: process.env.REDIS_USER,
  password: process.env.REDIS_PASS,
};

/* Este código define uma constante chamada "redisEnv" que contém um objeto com quatro propriedades. Essas propriedades são preenchidas com valores retirados das variáveis ​​
de ambiente definidas no ambiente em que o código está sendo executado. Essas variáveis ​​de ambiente são usadas para configurar uma conexão com um banco de dados Redis. 
As propriedades incluem o host (servidor) em que o Redis está sendo executado, a porta em que o Redis está ouvindo conexões, o nome de usuário para autenticação e a senha 
para autenticação. A propriedade "port" é convertida de uma string para um número usando o método "Number()". */