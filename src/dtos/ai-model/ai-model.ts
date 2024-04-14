import { Types, Schema } from "mongoose";
import { IAIModel } from "../../mongoose/schemas/aiModel";

export default class AIModelDTO {
    id: Types.ObjectId;
    name: string;
    provider: Types.ObjectId;

    constructor(model: IAIModel){
        this.id = model._id;
        this.name = model.name;
        this.provider = model.provider;
    }
};