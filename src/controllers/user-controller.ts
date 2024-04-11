import { Request, Response, NextFunction } from "express-serve-static-core";
import { validationResult } from "express-validator";

import { Types } from "mongoose";

import { Token } from "../mongoose/schemas/token";

import UserDTO from "../dtos/users/user-dto";
import APIError from "../exceptions/api-error";

import UserService from "../services/user-service";
import TokenService from "../services/token-service";
import TokenGeoService from "../services/tokenGeo-service";

import { compareHashedPassword, getFullUrl, getPaginatedResponse } from "../utils/helpers";
import userService from "../services/user-service";


class UserController {
    // auth
    async create(req: Request, res: Response, next: NextFunction){
        try {
            const result = validationResult(req);

            if (!result.isEmpty()) {
                return res.status(400).send(result.array());
            }
            const { email, password } = req.body;
            const user = UserService.create(email, password)
                .then(user => {
                    res.status(201).send(new UserDTO(user))
                })
                .catch(err => {
                    res.status(400).send({message: err.message});
                });
        } catch(e) {
            console.log(e);
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            // checking if user is already logged in
            if (req.cookies['refreshToken']) {
                throw APIError.BadRequestError('your are already logged in!');
            }

            const {email, password} = req.body;
            const user = await UserService.getUser(email, password);

            // checking if password is invalid
            const isValidPassword: boolean = compareHashedPassword(password, user.password);
            if (!isValidPassword) {
                throw APIError.BadRequestError('invalid password!');
            }

            // tokens and dto
            const userDTO = new UserDTO(user);
            const tokens = await TokenService.getTokens({...userDTO});

            // saving token to database and creating tokenGeoInfo
            await TokenService.saveToken(userDTO, tokens.accessToken, tokens.refreshToken);
            await TokenGeoService.createGeo(tokens.refreshToken, 
                req.ip || "unknown", req.headers["user-agent"] || "unknown", user._id);
                
            res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            res.status(201).send({ user: userDTO, access: tokens.accessToken })
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async refreshTokens(req: Request, res: Response, next: NextFunction) {
        try {
            const tokens = await TokenService.refreshTokens(req.cookies["refreshToken"]);
            if (!tokens) {
                throw APIError.UnauthorizedError('invalid tokens 1');
            }
            res.clearCookie("refreshToken");
            res.cookie("refreshToken", tokens.refreshToken);

            res.send({access: tokens.accessToken});
        } catch (e) {
            next(e);
        }
    }

    async getAllUserTokens(req: Request, res: Response, next: NextFunction) {
        try {
            const tokens = await TokenService.getUserTokens(req.cookies["refreshToken"]);
            res.send(tokens);
        } catch (err) {
            next(err);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            TokenService.deleteTokens(req.cookies["refreshToken"]);
            res.clearCookie("refreshToken");
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async logoutRemoteDevice(req: Request, res: Response, next: NextFunction) {
        try {
            // get refresh
            const currentTokenGeo = await TokenGeoService.getOne(req.params.id);
            const token = await Token.findOne({_id: currentTokenGeo.refresh});
            await TokenService.deleteTokens(token?.toObject().refreshToken as string);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    // other
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const offset: number | undefined = req.query.offset ? Number(req.query.offset) : 0;
            const limit: number | undefined = req.query.limit ? Number(req.query.limit) : Number(process.env.PAGINATION_COUNT);

            const users = (await UserService.getList(offset, limit)).map(user => (
                new UserDTO(user)
            ));
            const fullUrl = getFullUrl(req);
            const response = getPaginatedResponse(offset, limit, users, users.length, fullUrl);
            
            res.send(response);
        } catch (e) {
            next(e);
        }
    }
    
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.userId as string;
            if(!Types.ObjectId.isValid(id)) {
                throw APIError.BadRequestError("invalid id");
            }
            const user = await UserService.getUserById(id);
            res.send(user);
        } catch (e) {
            next(e);
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.userId as string;
            await UserService.deleteUserById(id);
            res.end();
        } catch (e) {
            next(e);
        }
    }
    
    async patchOne(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).send(result.array());
            }
            const id = req.params.userId as string;
            const user = await UserService.patchUserById(id, req.body);

            res.send(user);
        } catch (e) {
            next(e);
        }
    }

}

export default new UserController();