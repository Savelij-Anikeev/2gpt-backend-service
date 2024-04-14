import { AIModel } from "../mongoose/schemas/aiModel";

import AIModelDTO from "../dtos/ai-model/ai-model";
import { AIProvider } from "../mongoose/schemas/aiProvider";

import { isValidObjectID, isDocumentExists } from "../utils/helpers";



class AIModelService {
    async create(name: string, provider: string) {
        const model = await AIModel.create({name, provider});
        return new AIModelDTO(model.toObject());
    }
    async getList(): Promise<AIModelDTO[]> {
        return (await AIModel.find()).map(aimodle => new AIModelDTO(aimodle.toObject()));
    }
    async getById(_id: string) {
        isValidObjectID(_id);
        const aimodel = await AIModel.findOne({_id})
        isDocumentExists("AIModel", aimodel, _id);

        return new AIModelDTO(aimodel!.toObject());
    }
    async patchById(_id: string, data: {provider?: string, name?: string}): Promise<AIModelDTO>{
        isValidObjectID(_id);

        if (data.provider) {
            const provider = await AIProvider.findOne({_id: data.provider});
            isDocumentExists("AIProvider", provider, data.provider);
        }

        await AIModel.updateOne({_id}, data);
        const aimodel = await AIModel.findOne({_id});
        isDocumentExists("AIModel", aimodel, _id);  

        // ts can't understand that it cannot be null cause of validation function that
        // throws exception if no document was found
        return new AIModelDTO(aimodel!.toObject());
    }
    async deleteById(_id: string) {
        isValidObjectID(_id);
        await AIModel.deleteOne({id: _id});
    }
}

export default new AIModelService();