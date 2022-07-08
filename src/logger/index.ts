import logger from "pino";
import dayjs from "dayjs";

const log = logger({
    transport: {
        target: "pino-pretty"
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
    enabled: process.env.NODE_ENV !== "test"
})

export default log;
