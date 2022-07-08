import jws from "jsonwebtoken";
import config from "config"

const privateKey = config.get("privateKey") as string;

export function sign(object: Object, options: jws.SignOptions | undefined){
    return jws.sign(object, privateKey, options);
}
