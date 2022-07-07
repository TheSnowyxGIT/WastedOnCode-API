import { Request, Response } from "express";
import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import log from "../logger";
import { UserDocument } from "../model/user.model";
import { registerUserBody } from "../schema/default";
import { createUser } from "../service/user.service";


export async function registerUserHandler(req: Request, res: Response) {
    const body = req.body as registerUserBody;
    try {
        const user = await createUser(body as DocumentDefinition<UserDocument>);
        return res.status(200).send(omit(user.toJSON(), "password"))
    } catch (error) {
        log.error(error);
        //@ts-ignore
        res.status(409).send(error.message);
    }
}
