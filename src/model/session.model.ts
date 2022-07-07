import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"],
    userAgent: string,
    createdAt: Date,
    updateAt: Date,
}

const SessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userAgent: { type: String }
    },
    {timestamps: true}
);

const Session = mongoose.model("Session", SessionSchema);
export default Session;
