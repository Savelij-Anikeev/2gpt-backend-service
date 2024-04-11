export default class TokenGeoDTO {
    id;
    user;
    refresh;
    userIP;
    userAgent;

    constructor(id: string, user: string, refresh: string, userIP: string, userAgent: string){
        this.id = id;
        this.user = user;
        this.refresh = refresh;
        this.userIP = userIP;
        this.userAgent = userAgent;
    }
};