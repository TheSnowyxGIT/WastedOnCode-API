import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";

const app = express();
app.use(express.json());


const port = config.get("port") as number;
const host = config.get("host") as string;

app.listen(port, host, () => {
    log.info(`Server listening at http://${host}:${port}`);

    connect();

    routes(app);
})
