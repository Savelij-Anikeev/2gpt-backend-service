
import { Request, Response, NextFunction } from "express-serve-static-core";

import AIModelService from "../services/ai-model-service";

import { validationResult } from "express-validator";


class AIModelController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const models = await AIModelService.getList();
            res.status(201).send(models);
        } catch (err) {
            next(err);
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;


            const model = await AIModelService.getById(id);
            res.send(model);
        } catch (err) {
            next(err);
        }     
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(400).send(result.array());
            }
            const { name, provider } = req.body;
            const aimodel = await AIModelService.create(name, provider)

            res.send(aimodel);

        } catch (err) {
            next(err);
        }     
    }
    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const aimodel = await AIModelService.patchById(req.params.id);
            res.send(aimodel);
        } catch (err) {
            next(err);
        }       
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await AIModelService.deleteById(req.body.id)
            res.status(204).send();
        } catch (err) {
            next(err);
        }     
    }
}

export default new AIModelController();