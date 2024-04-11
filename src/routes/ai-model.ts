import { Request, Response, NextFunction } from "express-serve-static-core";
import { Router } from "express";

import AIModelController from "../controllers/ai-model-controller";

import { checkSchema } from "express-validator";

import { AIModelValidationSchema, AIModelValidationSchemaPatch } from "../utils/validationSchemas";


const router = Router();

// list
router.get('/ai-models/',
    (req: Request, res: Response, next: NextFunction) => {
        return AIModelController.getAll(req, res, next);
    }
)

router.post('/ai-models/',
    checkSchema(AIModelValidationSchema),
    (req: Request, res: Response, next: NextFunction) => {
        return AIModelController.create(req, res, next);
    }
)

// detail
router.get('/ai-models/:id',
    (req: Request, res: Response, next: NextFunction) => {
        return AIModelController.getOne(req, res, next);
    }
)

router.patch('/ai-models/:id',
    checkSchema(AIModelValidationSchemaPatch),
    (req: Request, res: Response, next: NextFunction) => {
        return AIModelController.patch(req, res, next);
    }
)

router.delete('/ai-models/:id',
    (req: Request, res: Response, next: NextFunction) => {
        return AIModelController.delete(req, res, next);
    }
)

export default router;