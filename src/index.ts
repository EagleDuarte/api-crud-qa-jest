import { DatabaseConnection } from "./main/database/typeorm.connection";
import { CacheConnection } from "./main/database/cache.connection";
import { runServer } from "./main/server/express.server";

// DatabaseConnection.connect().then(() => {
//   CacheConnection.connect().then(() => {
//     runServer();
//   })
// })

Promise.all([DatabaseConnection.connect(), CacheConnection.connect()]).then(
  () => {
    runServer();
  }
);
