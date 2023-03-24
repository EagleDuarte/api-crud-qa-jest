# Api de TASKS utilizando testes. 
- Banco de Dados III e Arquitetura de Software. 

# Comandos executados neste projeto:

- migration:generate: gera um novo arquivo de migração de banco de dados
- migration:run: executa as migrações de banco de dados
- migration:create: cria um novo arquivo de migração de banco de dados vazio
- migration:run:test: executa as migrações de banco de dados em ambiente de teste
- migration:generate:test: gera um novo arquivo de migração de banco de dados em ambiente de teste
- test:setup: remove o banco de dados existente, gera as migrações de banco de dados em ambiente de - teste e executa as migrações
- test: executa os testes automatizados com Jest
- test:verbose: executa os testes automatizados com Jest em modo verbose
- test:coverage: executa os testes automatizados com Jest e gera relatórios de cobertura de código
- test:watch: executa os testes automatizados com Jest e aguarda por alterações no código
- test:unit: executa apenas os testes unitários com Jest
- test:unit:verbose: executa apenas os testes unitários com Jest em modo verbose
- test:unit:coverage: executa apenas os testes unitários com Jest e gera relatórios de cobertura de código
- test:unit:watch: executa apenas os testes unitários com Jest e aguarda por alterações no código
- test:integration: executa apenas os testes de integração com Jest em ambiente de teste
- test:integration:verbose: executa apenas os testes de integração com Jest em modo verbose em ambiente de teste
- test:integration:coverage: executa apenas os testes de integração com Jest e gera relatórios de cobertura de código em ambiente de teste
- test:integration:watch: executa apenas os testes de integração com Jest e aguarda por alterações no código em ambiente de teste

# Dependências de desenvolvimento: 

- @types/bcrypt: tipos para a biblioteca bcrypt
- @types/cors: tipos para a biblioteca cors
- @types/express: tipos para a biblioteca express
- @types/jest: tipos para o framework de testes Jest
- @types/jsonwebtoken: tipos para a biblioteca jsonwebtoken
- @types/node: tipos para o ambiente Node.js
- @types/pg: tipos para o driver de banco de dados pg
- @types/supertest: tipos para a biblioteca supertest
- @types/uuid: tipos para a biblioteca uuid
- ts-jest: plugin para executar testes com Jest em ambiente TypeScript
- ts-node-dev: ferramenta para executar código TypeScript em ambiente de desenvolvimento
- typescript: linguagem de programação TypeScript
- cross-env: permite definir variáveis de ambiente de forma cross-platform
- rimraf: ferramenta para remover diretórios recursivamente
- sqlite3: driver de banco de dados SQLite para Node.js

# Dependências de produção: 

- bcrypt: biblioteca para criptografia de senhas
- cors: middleware para habilitar CORS em aplicações express
- dotenv: biblioteca para carregar variáveis de ambiente a partir de um arquivo
- express: framework para construir APIs web
- ioredis: cliente Redis para Node.js
- jsonwebtoken: biblioteca para trabalhar com JSON Web Tokens
- pg: cliente PostgreSQL para Node.js
- reflect-metadata: biblioteca para adicionar metadata a classes e seus membros
- typeorm: framework ORM (Object-Relational Mapping) para Node.js e TypeScript
- uuid: biblioteca para gerar IDs únicos

# Comando para rodar API:
- npm run dev