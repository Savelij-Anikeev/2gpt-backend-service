import APIError from "../exceptions/api-error";
import {Request, Response, NextFunction} from "express-serve-static-core";

import TokenService from "../services/token-service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(APIError.UnauthorizedError('no authorization header'));
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(APIError.UnauthorizedError('no access token'));
        }

        const userData = await TokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(APIError.UnauthorizedError('invalid access token'));
        }
        
        if (!userData.isAdmin) {
            return next(APIError.UnauthorizedError('don\'t have admin permissions'));
        }

        next();

    } catch (e) {
        console.log(e);
        
        return next(APIError.UnauthorizedError());
    }
}