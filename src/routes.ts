import {Express, Request, Response } from "express";
import { registerUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateRequest";
import { registerUserSchema } from "./schema/default";

export default function(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.post("/register", validate(registerUserSchema), registerUserHandler)

}
