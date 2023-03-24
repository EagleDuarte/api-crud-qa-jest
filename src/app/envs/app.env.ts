import "dotenv/config";

export const appEnv = {
    port: process.env.PORT,
    databaseUrl: process.env.DB_URL,
};
