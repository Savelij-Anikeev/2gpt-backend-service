import { Types, Model } from "mongoose";

import { User } from "../mongoose/schemas/user";

import { isDocumentExists, isValidObjectID } from "../utils/helpers";

import APIError from "../exceptions/api-error";

import tokenService from "../services/token-service";


export const IsAdminOrOwner = async (model: Model<any>, entryId: string, accessToken: string) => {
    // checking if id's in ObejctId format
    isValidObjectID(entryId);

    const doc = await model.findOne({_id: entryId});
    isDocumentExists(`${doc}`, doc, entryId);

    const userData = await tokenService.validateAccessToken(accessToken);
    if (!userData) {
        throw APIError.UnauthorizedError(`invalid access token`);
    }

    if (!userData.isAdmin && doc.user !== userData.id) {
        throw APIError.UnauthorizedError(`user with id = ${userData.id} don't have permissions to perform this action`);
    }
}