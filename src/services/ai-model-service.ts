import { Types } from "mongoose";

import { AIModel, IAIModel } from "../mongoose/schemas/aiModel";

import AIModelDTO from "../dtos/ai-model/ai-model";

import APIError from "../exceptions/api-error";



class AIModelService {
    async create(name: string, provider: string) {
        const model = await AIModel.create({name, provider});
        return new AIModelDTO(model.toObject());
    }
    async getList(): Promise<AIModelDTO[]> {
        return (await AIModel.find()).map(aimodle => new AIModelDTO(aimodle.toObject()));
    }
    async getById(_id: string) {
        if (!Types.ObjectId.isValid(_id)){
            throw APIError.BadRequestError('invalid id');
        }
        const aimodel = (await AIModel.find({_id}))[0]
        if (!aimodel) {
            throw APIError.BadRequestError(`no ai-model with id '${_id}' was found`);
        }
        return new AIModelDTO(aimodel.toObject());
    }
    async patchById(_id: string, data: {provider?: string, name?: string}) {
        
    }
    async deleteById(_id: string) {
        await AIModel.deleteOne({id: _id});
    }
}

export default new AIModelService();