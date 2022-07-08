import {Request, Response} from "express"
import log from "../logger";
import { createUserSessionBody } from "../schema/auth";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {
    const body = req.body as createUserSessionBody;

    // validate email & password
    const user = await validatePassword(body);

    if (! user ){
        return res.status(401).send("Invalid password or email");
    }

    // Create Session
    const userAgent = req.get("user-agent") || "";
    const session = await createSession(user._id, userAgent);

    // Create Access token

    // Create Refresh token

    // Return both access and refresh tokens
    return res.status(200).json({});
}
