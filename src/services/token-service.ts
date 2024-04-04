import UserDTO from "../dtos/users/user-dto";
import jwt from "jsonwebtoken";

import { Token } from "../mongoose/schemas/token";
import {IUser, User} from "../mongoose/schemas/user";
import APIError from "../exceptions/api-error";
import Users from "../routes/users";


class TokenService {

    private JWT_ACCESS_SECRET: string = String(process.env.JWT_ACCESS_SECRET);
    private JWT_REFRESH_SECRET: string = String(process.env.JWT_REFRESH_SECRET);

    async getTokens(payload: UserDTO): Promise<{accessToken: string, refreshToken: string}> {
        // generating tokens
        const accessToken: string = jwt.sign(payload, this.JWT_ACCESS_SECRET);
        const refreshToken: string = jwt.sign(payload, this.JWT_REFRESH_SECRET);

        return {accessToken, refreshToken}
    }
    async saveToken(user: UserDTO, accessToken: string, refreshToken: string) {
        // create document in db
        const savedToken = await Token.create({user: user.id, accessToken, refreshToken});
        savedToken.save();
    }

    async validateAccessToken(accessToken: string): Promise<string | jwt.JwtPayload | null> {
        try {
            const userData = jwt.verify(accessToken, this.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(refreshToken: string): Promise<string | jwt.JwtPayload | null> {
        try {
            const userData = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async refreshTokens(oldRefreshToken: string, oldAccessToken: string) {
        try {
            const userDataRef = await this.validateRefreshToken(oldRefreshToken);
            const userDataAcc = await this.validateAccessToken(oldAccessToken);
            const tokenFormDb = await Token.findOne({refreshToken: oldRefreshToken}).exec();

            if (!userDataRef || !userDataAcc || !tokenFormDb) {
                throw APIError.UnauthorizedError();
            }

            if (oldAccessToken !== tokenFormDb.toObject().accessToken) {
                throw APIError.UnauthorizedError('accessToken is deactivated');
            }

            const user = await User.findById(tokenFormDb.user);
            if (!user){
                throw APIError.UnauthorizedError('invalid token, can`t find user');
            }
            const tokens = await this.getTokens({...new UserDTO(user.toObject())});

            console.log(tokens)
            tokenFormDb.refreshToken = tokens.refreshToken; tokenFormDb.accessToken = tokens.accessToken;
            tokenFormDb.createdAt = Date.now(); tokenFormDb.save();

            return tokens;
        } catch (e) {
            return null;
        }

    }
}

export default new TokenService();