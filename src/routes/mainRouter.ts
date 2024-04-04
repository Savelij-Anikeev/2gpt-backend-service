import { Router } from "express";
import usersRouter from "./users";
import authRouter from "./oauth2";

// initializing constants and applying child routers
const router: Router = Router();

router.use(usersRouter);
router.use(authRouter);

export default router;
