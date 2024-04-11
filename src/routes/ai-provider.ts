import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

// Validation
import { checkSchema } from "express-validator";
import { AIProviderValidationSchema } from "../utils/validationSchemas";

// Controllers
import aiProviderController from "../controllers/ai-provider-controller";

// Middlewares
import AdminMiddleware from "../middlewares/admin-middleware";


const router = Router();

// CRUD for operations with `AIProvider` model.
// list
router.get('/ai-providers/', 
    AdminMiddleware,
    (req: Request, res: Response, next: NextFunction) => aiProviderController.getAll(req, res, next)
);

router.post('/ai-providers/', 
    AdminMiddleware, 
    checkSchema(AIProviderValidationSchema),
    (req: Request, res: Response, next: NextFunction) => aiProviderController.create(req, res, next)
);


// detail
router.get('/ai-providers/:id', 
    AdminMiddleware,
    (req: Request, res: Response, next: NextFunction) => (
        aiProviderController.getOne(req, res, next)
));

router.patch('/ai-providers/:id', 
    AdminMiddleware, 
    checkSchema(AIProviderValidationSchema),
    (req: Request, res: Response, next: NextFunction) => (
        aiProviderController.update(req, res, next)
));

router.delete('/ai-providers/:id', 
    AdminMiddleware,
    (req: Request, res: Response, next: NextFunction) => (
        aiProviderController.delete(req, res, next)
));

export default router;
