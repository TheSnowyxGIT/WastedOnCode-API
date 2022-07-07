import {AnySchema, ValidationError} from "yup"
import {Request, Response, NextFunction} from "express"
import log from "../logger";

export default function validate(schema: AnySchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params
            });
            return next();
        } catch (error) {
            let yup_err = error as ValidationError;
            log.error(yup_err);
            res.status(400).send(yup_err.errors)
        }
    }
}
