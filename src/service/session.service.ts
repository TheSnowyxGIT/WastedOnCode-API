import { get, omit } from "lodash";
import { DocumentDefinition, LeanDocument } from "mongoose"
import Session, { SessionDocument } from "../model/session.model";
import User, { UserDocument } from "../model/user.model";
import {decode, sign} from "../utils/jws.utils"
import { findUser } from "./user.service";

export async function createSession(userId: SessionDocument["user"], userAgent: string){
    const session = await Session.create({user: userId, userAgent: userAgent});
    return session.toJSON();
}

export async function getAccessToken(
    user: Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>,
    session: Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>
){
    const accessToken = sign({ ...user, session: session._id }, {
        expiresIn: "24h"
    });
    return accessToken;
}

export async function reIssueAccessToken(refreshToken: string){
    const {decoded} = decode(refreshToken);

    if (! decoded || !get(decoded, "_id")){
        return false;
    }

    const session = await Session.findById(get(decoded, "_id"))

    if (! session){
        return false;
    }

    const user = await findUser({ _id: session.user });

    if (! user){
        return false;
    }

    //@ts-ignore
    const newAccessToken = getAccessToken(user, session);
    return newAccessToken;
}

