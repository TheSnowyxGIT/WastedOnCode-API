import {NextFunction, Request, Response} from "express"
import { get } from "lodash"
import log from "../logger";
import { reIssueAccessToken } from "../service/session.service";
import { decode } from "../utils/jws.utils";

export async function deserializeUser(req: Request, res: Response, next: NextFunction) {

    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    if (! accessToken ){
        return next();
    }

    const {decoded, expired} = decode(accessToken);

    if (decoded){
        // @ts-ignore
        req.user = decoded;

        return next();
    }

    const refreshToken = get(req, "headers.x-refresh", "");
    
    if (refreshToken && expired){
        // need to update accessToken
        const newAccessToken = await reIssueAccessToken(refreshToken);

        if (newAccessToken){
            // set the newly created access token in the header response
            res.setHeader("x-access-token", newAccessToken);

            const { decoded } = decode(newAccessToken);

            const userAgent = get(req, "headers.user-agent", "");
            log.info(`[${get(decoded, "email")}, ${userAgent}] access token refreshed`)
        }
    }
    return next();
}
