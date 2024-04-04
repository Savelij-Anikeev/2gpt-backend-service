import { Request, Response, NextFunction } from "express-serve-static-core";
import DiscordService from "../services/auth/discord-service";
import APIError from "../exceptions/api-error";


class AuthDiscordController {
    async handleRedirect(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.query;
            if (!code) throw APIError.UnauthorizedError('cannot get discord code');

            // const clientData = await DiscordService.getClientData(code.toString());
            // const { data: {access_token} } = await DiscordService.getTokens(clientData);
            // const userInfo = await DiscordService.getUser(access_token);
            const a = DiscordService.testFunc(code.toString());
            res.send('asdasd');
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthDiscordController();