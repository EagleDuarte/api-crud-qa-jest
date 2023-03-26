export default {
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testTimeout: 30000,
  roots: ["<rootDir>/tests"],
};

/* Este código exporta um objeto que define as configurações do Jest para testes em um projeto TypeScript. Alguns exemplos das configurações são:

clearMocks: configura para que o Jest limpe os mocks automaticamente após cada teste;
collectCoverageFrom: configura os arquivos a serem incluídos na cobertura de teste;
coverageDirectory: define o diretório onde os relatórios de cobertura de teste serão gerados;
preset: define o preset usado para rodar os testes, que no caso é o "ts-jest";
testEnvironment: define o ambiente de teste, que no caso é o Node.js;
transform: configura os arquivos que serão transformados, que no caso são aqueles com extensão ".ts" usando o "ts-jest";
testTimeout: configura o tempo máximo permitido para a execução de cada teste, que no caso é de 30000 milissegundos;
roots: define o diretório raiz onde os testes serão encontrados. */