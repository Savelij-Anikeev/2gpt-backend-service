import APIError from "../exceptions/api-error";
import { Request, Response, NextFunction } from "express-serve-static-core";

import TokenService from "../services/token-service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh = req.cookies["refreshToken"];

        const userData = TokenService.validateRefreshToken(refresh);
        if (!userData) {
            return next(APIError.UnauthorizedError('invalid refresh token'));
        }
        
        next();

    } catch (e) {
        console.log(e);
        
        return next(APIError.UnauthorizedError());
    }
}