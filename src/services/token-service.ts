import jwt from "jsonwebtoken";
import {ObjectId} from "mongoose";
 
import APIError from "../exceptions/api-error";

import { Token } from "../mongoose/schemas/token";
import { TokenGeo } from "../mongoose/schemas/tokenGeo";
import { User } from "../mongoose/schemas/user";
import UserDTO from "../dtos/users/user-dto";
import TokenGeoDTO from "../dtos/tokens/tokenGeo-dto";


class TokenService {

    private JWT_ACCESS_SECRET: string = String(process.env.JWT_ACCESS_SECRET);
    private JWT_REFRESH_SECRET: string = String(process.env.JWT_REFRESH_SECRET);

    async getTokens(payload: UserDTO): Promise<{accessToken: string, refreshToken: string}> {
        // generating tokens
        const accessToken: string = jwt.sign(payload, 
            this.JWT_ACCESS_SECRET, 
            {expiresIn: process.env.JWT_ACCESS_EXPIRES as string});
        const refreshToken: string = jwt.sign(payload, this.JWT_REFRESH_SECRET);

        return {accessToken, refreshToken}
    }

    async saveToken(user: UserDTO, accessToken: string, refreshToken: string) {
        // create document in db
        const savedToken = await Token.create({user: user.id, accessToken, refreshToken});
        savedToken.save();
    }

    async deleteTokens(refresh: string): Promise<undefined>{
        try {
            const userData = await this.validateRefreshToken(refresh);

            if (!userData) {
                throw APIError.BadRequestError('invalid refresh! cannot delete tokens!');
            }
            await TokenGeo.deleteOne({user: userData.id});
            await Token.deleteOne({refreshToken: refresh});

        } catch (err) {
            throw APIError.BadRequestError(`${err}`);
        }
    }

    async validateAccessToken(accessToken: string): Promise<jwt.JwtPayload | null> {
        try {
            const userData = jwt.verify(accessToken, this.JWT_ACCESS_SECRET);
            return userData as jwt.JwtPayload;
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(refreshToken: string): Promise<jwt.JwtPayload | null> {
        try {
            const userData = jwt.verify(refreshToken, this.JWT_REFRESH_SECRET);
            return userData as jwt.JwtPayload;
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

    async getUserTokens(refresh: string): Promise<any | null> {
        try {
            const user = await this.validateRefreshToken(refresh);
            if(!user) {
                throw APIError.BadRequestError('invalid refresh!');
            }

            const geoTokens = (await TokenGeo.find({user: user.id}))
            if (!geoTokens) {
                throw APIError.BadRequestError('Can\'t find sessions');
            }

            return geoTokens.map(e => {
                return new TokenGeoDTO(
                    e._id.toString(),
                    e.user.toString(), 
                    e.refresh.toString(),
                    e.userAgent,
                    e.userIP
                );
            });
            

        } catch (err) {
            return null;
        }
    }

}

export default new TokenService();