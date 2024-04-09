import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

import { UserValidationSchema } from "../utils/validationSchemas";
import { checkSchema } from "express-validator";

import UserController from "../controllers/user-controller";

import authMiddeware from "../middlewares/auth-middeware";
import refreshMiddleware from "../middlewares/refresh-middleware";


const router = Router();

// auth
router.post('/register/', checkSchema(UserValidationSchema),
    (req: Request, res: Response, next: NextFunction) => UserController.create(req, res, next));

router.post('/login/', checkSchema(UserValidationSchema),
    (req: Request, res: Response, next: NextFunction) => UserController.login(req, res, next));

router.post('/refresh-token/', refreshMiddleware,
    (req: Request, res: Response, next: NextFunction) => UserController.refreshTokens(req, res, next));
router.delete('/logout/', authMiddeware,
    (req: Request, res: Response, next: NextFunction) => UserController.logout(req, res, next));

// users
router.get('/users', (req: Request, res: Response, next: NextFunction) => UserController.getAll(req, res, next));
router.get('/users/:userId', (req: Request, res: Response, next: NextFunction) => UserController.getOne(req, res, next));

// extra
// endpoint for getting user's  geo by tokens
router.get('/tokens', authMiddeware,
    (req: Request, res: Response, next: NextFunction) => UserController.getAllUserTokens(req, res, next)
);
router.delete('/tokens/:id', authMiddeware,
    (req: Request, res: Response, next: NextFunction) => UserController.logoutRemoteDevice(req, res, next)
);


export default router;