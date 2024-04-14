// Models
import { AIProvider } from "../mongoose/schemas/aiProvider";

// DTO's
import AIProviderDTO from "../dtos/ai-provider/ai-provider-dto";

// Helpers
import { isDocumentExists, isValidObjectID } from "../utils/helpers";

// Exceptions
import APIError from "../exceptions/api-error";



class AIProviderService {
    async create(name: string): Promise<AIProviderDTO> {
        const provider = await AIProvider.findOne({name});
        if (provider) {
            throw APIError.BadRequestError(`provider with name = ${name} already exist!`);
        }

        // creating provider
        const candidate = await AIProvider.create({name});
        return new AIProviderDTO(candidate);

    }
    async findById(_id: string): Promise<AIProviderDTO>  {
        isValidObjectID(_id);

        // getting to know about existing documents with the same unique attributes
        const provider = await AIProvider.findOne({_id});
        isDocumentExists("IAProvider", provider, _id);

        // returning DTO
        // cannot be nul cause of `isDocumentExists`
        return new AIProviderDTO(provider!);
    }

    async deleteById(_id: string): Promise<undefined> {
        // deleting document by id
        isValidObjectID(_id);
        await AIProvider.deleteOne({_id});
    }

    async partialUpdateById(_id: string, name: string): Promise<AIProviderDTO> {
        isValidObjectID(_id);
        await AIProvider.updateOne({_id}, {name});
        const provider = await this.findById(_id);

        return provider;
    }
}

export default new AIProviderService();