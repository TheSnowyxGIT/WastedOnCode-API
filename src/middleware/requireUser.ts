import {NextFunction, Request, Response} from "express"
import { get } from "lodash"

export default function requireUser(req: Request, res: Response, next: NextFunction){

    const user = get(req, "user");

    if (! user){
        return res.sendStatus(403);
    }

    return next();
}
