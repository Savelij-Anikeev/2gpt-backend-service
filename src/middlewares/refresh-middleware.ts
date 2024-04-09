import APIError from "../exceptions/api-error";
import {Request, Response, NextFunction} from "express-serve-static-core";

import TokenService from "../services/token-service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(APIError.UnauthorizedError('no authorization header'));
        }

        const userData = TokenService.validateRefreshToken(authorizationHeader.split(' ')[-1]);
        if (!userData) {
            return next(APIError.UnauthorizedError('invalid refresh token'));
        }
        
        next();

    } catch (e) {
        console.log(e);
        
        return next(APIError.UnauthorizedError());
    }
}