import * as url from "url";
import axios from "axios";
import APIError from "../../exceptions/api-error";
import {exec} from "node:child_process";


class DiscordService {
    // async getClientData(code: string) {
    //     const uri: string = String(process.env.BASE_SITE_URL) + 'api/v1' + String(process.env.DISCORD_REDIRECT_URL);
    //     const result = new url.URLSearchParams({
    //         client_id: process.env.DISCORD_CLIENT_ID as string,
    //         client_secret: process.env.DISCORD_CLIENT_SECRET as string,
    //         grad_type: 'authorization_code',
    //         code: code,
    //         redirect_uri: uri
    //     });
    //     console.log('got client data');
    //     return result;
    // }
    //
    // async getTokens(data: any) {
    //     try {
    //         const getTokenUrl: string = process.env.DISCORD_GET_TOKEN_URL as string;
    //
    //         const output = await axios.post(getTokenUrl, data, {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         });
    //         if (!output.data) {
    //             throw APIError.UnauthorizedError('invalid request discord data');
    //         }
    //         console.log('got token');
    //         return output;
    //     } catch (e) {
    //         console.log(e);
    //         throw APIError.UnauthorizedError('jopasdasd');
    //     }
    // }
    //
    // async getUser(accessToken: string) {
    //     const getUserUrl: string = process.env.DISCORD_GET_USER_URL as string;
    //
    //     const userInfo = await axios.get(getUserUrl, {
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     })
    //     console.log('got user data');
    //     console.log(userInfo.data);
    //     return userInfo;
    // }

    async testFunc(code: string) {
        const uri: string = String(process.env.BASE_SITE_URL) + 'api/v1' + String(process.env.DISCORD_REDIRECT_URL);
        const formData = new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID as string,
            client_secret: process.env.DISCORD_CLIENT_SECRET as string,
            grad_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: uri
        })
        const output = await axios.post('https://discord.com/api/oauth2/token?client_id=1222210452411650119&client_secret=RgNLbIYITbHFZ-Nf0Nz51DBUz2OqGEFU&grad_type=authorization_code&code=pv5D9BCD17us4QKV00kAh9kJWzE9rW&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fdiscord%2Fre\n' +
            'direct%2F', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })

        if (output.data) {
            const access = output.data.access_token;
            const userInfo = await axios.get('https://discord.com/api/v10/users/@me', {
                headers: {
                    'Authorization': `Bearer ${access}`
                },
            })
        }
    }
}

export default new DiscordService();
