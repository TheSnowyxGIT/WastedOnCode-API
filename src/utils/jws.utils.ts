import jws from "jsonwebtoken";
import config from "config"

const privateKey = config.get("privateKey") as string;

export function sign(object: Object, options: jws.SignOptions | undefined){
    return jws.sign(object, privateKey, options);
}

export function decode(token: string){
    try {
        const decoded = jws.verify(token, privateKey);
        return {expired: false, valid: true, decoded};
    } catch (error) {
        return {
            valid: false,
            decoded: null,
            expired: (error as jws.VerifyErrors).message === "jwt expired"
        }
    }
}
