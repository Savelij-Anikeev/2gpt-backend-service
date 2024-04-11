import { Request, Response, NextFunction } from "express-serve-static-core";

// error
import APIError from "../exceptions/api-error";

// Models
import { AIProvider } from "../mongoose/schemas/aiProvider"

// Services
import AIProviderService from "../services/ai-provider-service";

// Validation
import { validationResult } from "express-validator";
import AIProviderDTO from "../dtos/ai-provider/ai-provider-dto";


class AIProviderController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const providers = (await AIProvider.find()).map(e => {
                const obj = e.toObject();
                return new AIProviderDTO(obj._id, obj.name)
            })
            res.send(providers);
        } catch(err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // checking validation result
            const result = validationResult(req);

            if (!result.isEmpty()) {
                res.send(result);
            }

            // checking if provider with this name doesn't exist
            const { name } = req.body;
            const provider = await AIProvider.findOne({name});
            if (provider) {
                throw APIError.BadRequestError(`provider with this name ${name} already exist!`);
            }

            // creating provider
            const candidate = (await AIProvider.create({name})).toObject();
            res.status(201).send(new AIProviderDTO(candidate._id, candidate.name));
            

        } catch(err) {
            next(err);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const provider = await AIProviderService.findById(req.params.id);
            res.send(provider);
        } catch(err) {
            next(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const provider = await AIProviderService.partialUpdateById(req.params.id, req.body.name);
            res.send(provider);
        } catch(err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await AIProviderService.deleteById(req.params.id);
            res.status(204).send();
        } catch(err) {
            next(err);
        }
    }
}

export default new AIProviderController();