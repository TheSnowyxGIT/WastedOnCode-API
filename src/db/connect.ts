import mongoose from 'mongoose'
import config from 'config'
import log from '../logger'

function connect() {
    const dbUri = config.get("dbUri") as string;
    log.info(`used dbUri ${dbUri}`)
    return mongoose.connect(dbUri)
        .then(() => log.info(`Database connected`))
        .catch(err => {
            log.error(err, `db error`);
            process.exit(1)
        });
}

export default connect;
