import { Pool } from "pg";

export const dbConnection = new Pool({
  // Opção 1
  connectionString:
    "postgres://bd_growdev_se21_user:k07O1A19bkx0SKWqynG48My2odW4s1TI@dpg-cdmpa5la49944a8m36u0-a.frankfurt-postgres.render.com/bd_growdev_se21",

  // Opção 2
  // host: "dpg-cdmpa5la49944a8m36u0-a.frankfurt-postgres.render.com",
  // user: "bd_growdev_se21_user",
  // password: "k07O1A19bkx0SKWqynG48My2odW4s1TI",
  // database: "bd_growdev_se21",
  // port: 5432,

  ssl: {
    rejectUnauthorized: false,
  },
});
