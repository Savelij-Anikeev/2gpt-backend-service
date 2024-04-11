import { Router } from "express";

import usersRouter from "./users";
import authRouter from "./oauth2";
import aiProviderRouter from "./ai-provider";
import aiModelRouter from "./ai-model";

// initializing constants and applying child routers
const router: Router = Router();

router.use(usersRouter);
router.use(authRouter);
router.use(aiProviderRouter);
router.use(aiModelRouter);

export default router;
