import { Router } from "express";
import { Request, Response, NextFunction } from "express-serve-static-core";

import userModelRelationController from "../controllers/user-model-relation-controller";


const router = Router();

// getting all user's model relations
router.get('/user-model-relations/', 
    (req: Request, res: Response, next: NextFunction) => userModelRelationController.getList(req, res, next))
// creating user-model relation
router.post('/user-model-relations/', 
    (req: Request, res: Response, next: NextFunction) => userModelRelationController.create(req, res, next))
    
// getting user-model relation by id
router.get('/user-model-relations/:id', 
    (req: Request, res: Response, next: NextFunction) => userModelRelationController.getOne(req, res, next))
// patching user-model relation by id
router.patch('/user-model-relations/:id', 
    (req: Request, res: Response, next: NextFunction) => userModelRelationController.patch(req, res, next))
// deleting user-model relation by id
router.delete('/user-model-relations/:id', 
    (req: Request, res: Response, next: NextFunction) => userModelRelationController.delete(req, res, next))

export default router;