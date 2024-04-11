// Errors
import APIError from "../exceptions/api-error";

// Models
import { AIProvider, IAIProvider } from "../mongoose/schemas/aiProvider";

// Types
import { Types } from "mongoose";

// DTO's
import AIProviderDTO from "../dtos/ai-provider/ai-provider-dto";


class AIProviderService {
    async findById(_id: string): Promise<AIProviderDTO>  {
        // checking if id valid
        if (!Types.ObjectId.isValid(_id)) {
            throw APIError.BadRequestError('invalid id');
        }

        // getting to know about existing documents with the same unique attributes
        const provider = await AIProvider.findOne({_id});
        if (!provider) {
            throw APIError.BadRequestError('provider not found');
        }

        // returning DTO
        return new AIProviderDTO(provider.toObject()._id, provider.toObject().name);
    }

    async deleteById(_id: string): Promise<undefined> {
        // deleting document by id
        await AIProvider.deleteOne({_id});
    }

    async partialUpdateById(_id: string, name: string): Promise<IAIProvider> {
        await AIProvider.updateOne({_id}, {name});
        const provider = await this.findById(_id);

        return new AIProviderDTO(provider.id, provider.name);
    }
}

export default new AIProviderService();