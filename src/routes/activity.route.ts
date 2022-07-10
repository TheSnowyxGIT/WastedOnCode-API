import {Router} from "express";
import requireUser from "../middleware/requireUser";
const activityRoute = Router();

activityRoute.get("/", requireUser)

export default activityRoute;
