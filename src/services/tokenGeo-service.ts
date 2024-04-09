import { Token } from "../mongoose/schemas/token";
import { TokenGeo } from "../mongoose/schemas/tokenGeo";

import APIError from "../exceptions/api-error";
import { ITokenGeo } from "../mongoose/schemas/tokenGeo";

class TokenGeoService {
    async createGeo(refresh: string, userIP: string, userAgent: string, userID: string): Promise<undefined> {
        try {
            const tokenDoc = await Token.findOne({refreshToken: refresh});
            if (!tokenDoc) {
                throw APIError.BadRequestError("Can't find document by refresh token...");
            }

            await TokenGeo.create({refresh: tokenDoc._id, user: userID, userIP, userAgent});

        } catch (err) {
            throw APIError.BadRequestError("error while creating geo-token");
        }
    }

    async getOne(id: string): Promise<ITokenGeo> {
        try {
            const instance = await TokenGeo.findOne({_id: id})
            if (!instance) {
                throw APIError.BadRequestError('Can\'t find instance of Token Geo')
            }
            return instance.toObject();
        } catch (err) {
            throw APIError.BadRequestError('Invlaid request params!');
        }
    }
}

export default new TokenGeoService();