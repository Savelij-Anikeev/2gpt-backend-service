import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

// Validation
import { UserValidationSchema } from "../utils/validationSchemas";
import { checkSchema } from "express-validator";

// Controllers
import UserController from "../controllers/user-controller";

// Middlewares
import authMiddleware from "../middlewares/auth-middleware";
import refreshMiddleware from "../middlewares/refresh-middleware";


const router = Router();

// auth
router.post('/register/', checkSchema(UserValidationSchema),
    (req: Request, res: Response, next: NextFunction) => UserController.create(req, res, next));

router.post('/login/', checkSchema(UserValidationSchema),
    (req: Request, res: Response, next: NextFunction) => UserController.login(req, res, next));

router.post('/refresh-token/', refreshMiddleware,
    (req: Request, res: Response, next: NextFunction) => UserController.refreshTokens(req, res, next));
router.delete('/logout/', authMiddleware,
    (req: Request, res: Response, next: NextFunction) => UserController.logout(req, res, next));

// users
router.get('/users', 
    (req: Request, res: Response, next: NextFunction) => UserController.getAll(req, res, next));
router.get('/users/:userId', 
    (req: Request, res: Response, next: NextFunction) => UserController.getOne(req, res, next));
router.delete('/users/:userId', 
    (req: Request, res: Response, next: NextFunction) => UserController.deleteOne(req, res, next));
router.patch('/users/:userId', 
    (req: Request, res: Response, next: NextFunction) => UserController.patchOne(req, res, next));

// extra
// endpoint for getting user's  geo by tokens
router.get('/tokens', authMiddleware,
    (req: Request, res: Response, next: NextFunction) => UserController.getAllUserTokens(req, res, next)
);
router.delete('/tokens/:id', authMiddleware,
    (req: Request, res: Response, next: NextFunction) => UserController.logoutRemoteDevice(req, res, next)
);

export default router;