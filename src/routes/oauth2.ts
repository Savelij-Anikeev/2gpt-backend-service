import { Router } from "express";
import {NextFunction, Request, Response} from "express-serve-static-core";

import AuthDiscordController from "../controllers/auth-discord-controller";


const router = Router();
const discordRedirectUrl = process.env.DISCORD_REDIRECT_URL as string;

router.get(discordRedirectUrl, (req: Request, res: Response, next: NextFunction) =>
    AuthDiscordController.handleRedirect(req, res, next))

export default router;
