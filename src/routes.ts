import {Express, Request, Response } from "express";
import authRoute from "./routes/auth.route";
import activityRoute from "./routes/activity.route";

export default function(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.use("/auth", authRoute);

    app.use("/activity", activityRoute);
}
