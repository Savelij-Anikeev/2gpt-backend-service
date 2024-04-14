import { Types } from "mongoose";
import { IAIProvider } from "../../mongoose/schemas/aiProvider";

export default class AIProviderDTO {
    id: Types.ObjectId;
    name: string;

    constructor(model: IAIProvider){
        this.id = model._id;
        this.name = model.name;
    }
};