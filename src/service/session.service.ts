import { DocumentDefinition, LeanDocument } from "mongoose"
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import {sign} from "../utils/jws.utils"

export async function createSession(userId: SessionDocument["user"], userAgent: string){
    const session = await Session.create({user: userId, userAgent: userAgent});
    return session.toJSON();
}

export async function getAccessToken(
    user: Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>,
    session: Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>
){
    const accessToken = sign({ ...user, session: session._id }, {
        expiresIn: "15m"
    });
    return accessToken;
}
