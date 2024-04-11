import { Types } from "mongoose";

export default class AIProviderDTO {
    id;
    name;

    constructor(id: Types.ObjectId, name: string){
        this.id = id;
        this.name = name;
    }
};