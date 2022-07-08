import {Router} from "express";
import validate from "../middleware/validateRequest";
import { registerUserHandler } from "../controller/user.controller";
import { createUserSessionSchema, registerUserSchema } from "../schema/auth";
import { createUserSessionHandler } from "../controller/session.controller";

const authRoute = Router();

authRoute.post("/users", validate(registerUserSchema), registerUserHandler)

authRoute.post("/sessions", validate(createUserSessionSchema), createUserSessionHandler)

export default authRoute;
