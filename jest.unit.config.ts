import config from "./jest.config";

export default {
  ...config,
  testMatch: ["**/*.spec.ts"],
};

/* Este código é um arquivo de configuração para o Jest que está sendo exportado. Ele importa a configuração padrão do Jest do arquivo 
"jest.config.js". Em seguida, ele sobrescreve a chave "testMatch" para garantir que o Jest execute apenas arquivos que terminem com
".spec.ts". Isso é útil para garantir que os testes sejam executados apenas nos arquivos de teste especificados */