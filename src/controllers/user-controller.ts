import { Request, Response, NextFunction } from "express-serve-static-core";
import { validationResult } from "express-validator";

import UserDTO from "../dtos/users/user-dto";
import APIError from "../exceptions/api-error";
import UserService from "../services/user-service";
import TokenService from "../services/token-service";

import {compareHashedPassword} from "../utils/helpers";

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
            // saving token to database
            await TokenService.saveToken(userDTO, tokens.accessToken, tokens.refreshToken);

            res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
            res.status(201).send({ user: userDTO, access: tokens.accessToken })
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
    async refreshTokens(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.headers.authorization?.split(' ')[1]) {
                throw APIError.UnauthorizedError('no access token');
            }
            const oldAccessToken: string = req.headers.authorization.split(' ')[1];
            const tokens = await TokenService.refreshTokens(req.cookies["refreshToken"], oldAccessToken);
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

    // other
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const offset: number | undefined = req.query.offset ? Number(req.query.offset) : undefined;
            const limit: number | undefined = req.query.limit ? Number(req.query.limit) : undefined;
            const users = await UserService.getList(offset, limit);
            res.send(users);
        } catch (e) {
            throw APIError.BadRequestError('error while getting user list');
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.userId as string;
            const user = await UserService.getUserById(id);
            res.send(user);
        } catch (e) {
            throw APIError.BadRequestError('error while getting user list');
        }
    }
}

export default new UserController();