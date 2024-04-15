import { Request, Response, NextFunction } from "express-serve-static-core";

import { validationResult } from "express-validator";

import userModelRelationService from "../services/user-model-relation-service";
import tokenService from "../services/token-service";
import APIError from "../exceptions/api-error";

import { IsAdminOrOwner } from "../utils/permissions"
import { UserAIModel } from "../mongoose/schemas/userAIModel";


class UserModelRelationController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.send(result.array());
            }

            // it is required because of middleware
            const userData = await tokenService.validateAccessToken(req.headers.authorization!.split(' ')[1]);
            if (!userData) {
                return res.send('invalid access');
            }
            
            const userModelRelation = await userModelRelationService.createOne(req.body, userData.id);
        
            res.status(201).send(userModelRelation);
        } catch (err) {
            next(err);
        }
    }
    async getList(req: Request, res: Response, next: NextFunction) {
        try {
            // ! because of this endpoint is auth required
            const userData = await tokenService.validateAccessToken(req.headers.authorization!.split(' ')[1]);
            if (!userData) {
                return APIError.UnauthorizedError("invalid access token");
            }

            const userModelRelations = await userModelRelationService.getListByUserId(userData.id);
            res.send(userModelRelations);
        } catch (err) {
            next(err);
        }
     
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            // checking permissions
            await IsAdminOrOwner(UserAIModel, req.params.id, req.headers.authorization!.split(' ')[1]);
            const userModelRelation = await userModelRelationService.getById(req.params.id);
            res.send(userModelRelation);
        } catch (err) {
            next(err);
        }
        
    }
    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            // checking permissions
            await IsAdminOrOwner(UserAIModel, req.params.id, req.headers.authorization!.split(' ')[1]);
            const userModelRelation = await userModelRelationService.patchById(req.params.id, req.body);

            res.send(userModelRelation);
        } catch (err) {
            next(err);
        }
        
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            // checking permissions
            await IsAdminOrOwner(UserAIModel, req.params.id, req.headers.authorization!.split(' ')[1]);
            await userModelRelationService.deleteById(req.params.id)
            res.status(204).send();
        } catch (err) {
            next(err);
        }
        
    }
}

export default new UserModelRelationController();