import { Router } from "express";

// auth and users
import usersRouter from "./users";
import authRouter from "./oauth2";

// ai 
import aiProviderRouter from "./ai-provider";
import aiModelRouter from "./ai-model";
import userModelRelationRouter from "./user-model-relation";

// initializing constants and applying child routers
const router: Router = Router();

// auth and users
router.use(usersRouter);
router.use(authRouter);

// ai
router.use(aiProviderRouter);
router.use(aiModelRouter);
router.use(userModelRelationRouter);

export default router;
