import config from "config";
import log from "./logger";
import connect from "./db/connect";

const port = config.get("port") as number;
const host = config.get("host") as string;

import app from "./app";

app.listen(port, host, () => {
    log.info(`Server listening at http://${host}:${port}`);

    connect();
})
