import { Types } from "mongoose";

import { UserAIModel, IUserAIModel } from "../mongoose/schemas/userAIModel";
import UserModelRelationDTO from "../dtos/user-model-relation/user-model-relation-dto";
import { User } from "../mongoose/schemas/user";

import { isDocumentExists, isValidObjectID } from "../utils/helpers";
import APIError from "../exceptions/api-error";


class UserModelRelationService {
    async getById(_id: string): Promise<UserModelRelationDTO> {
        isValidObjectID(_id);
        const userModelRelation = await UserAIModel.findOne({ _id });
        isDocumentExists("UserModelRelation", userModelRelation, _id);

        return new UserModelRelationDTO(userModelRelation!.toObject());
    }

    async isValidUserLimits(userId: Types.ObjectId) {
        const user = await User.findOne({_id: userId});
        isDocumentExists("User", user, userId);

        // getting limit of models user can use depends on `isPremium`
        const userLimit: number = user!.isPremium ? 
            Number(process.env.PREMIUM_CHAT_COUNT) : Number(process.env.DEFAULT_CHAT_COUNT);

        // counting how many model relations user has
        const count: number = await UserAIModel.countDocuments({user: userId});

        if (count >= userLimit) {
            throw APIError.BadRequestError('limit of models in use is reached!');;
        } 
    }

    async createOne(data: Omit<IUserAIModel, "_id">, userId: Types.ObjectId): Promise<UserModelRelationDTO>{
        // checking if user reached his limits
        await this.isValidUserLimits(userId);

        // creating new relation
        const userModelRel = await UserAIModel.create({...data, user: userId});

        return new UserModelRelationDTO(userModelRel.toObject());
    }

    async deleteById(_id: string) {
        isValidObjectID(_id);
        await UserAIModel.deleteOne({ _id });
    }

    async patchById(_id: string, data: any) {
        isValidObjectID(_id);
        await UserAIModel.updateOne({_id}, {...data});
        
        const userModelRelation = await UserAIModel.findOne({ _id });
        isDocumentExists("UserModelRelation", userModelRelation, _id)

        return new UserModelRelationDTO(userModelRelation!.toObject());
    }

    async getListByUserId(userId: Types.ObjectId): Promise<UserModelRelationDTO[]> {
        const query = (await UserAIModel.find({user: userId})).map(e => new UserModelRelationDTO(e.toObject()));
        return query;
    }
}

export default new UserModelRelationService();