import APIError from "../exceptions/api-error";
import SMTPError from "../exceptions/smtp-error";
import {Request, Response, NextFunction} from "express-serve-static-core";

export default function( err: Error,
                         req: Request, res: Response,
                         next: NextFunction): Response {
    if (err instanceof APIError) {
        return res.status(err.status).send({
            message: err.message,
            errors: err.errors
        })
    } else if (err instanceof SMTPError) {
        return res.status(err.status).send({
            message: err.message,
            errors: err.errors
        })
    }
    return res.status(500).send({message: 'internal error'});
}