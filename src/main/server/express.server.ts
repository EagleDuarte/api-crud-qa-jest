import { appEnv } from "../../app/envs/app.env";
import { createServer } from "../config/express.config";

export const runServer = () => {
    const app = createServer();

    app.listen(appEnv.port, () => {
        console.log("API running at port: " + process.env.PORT);
    });
};
