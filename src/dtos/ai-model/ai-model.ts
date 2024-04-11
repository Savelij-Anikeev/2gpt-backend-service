import { Types } from "mongoose";
import { IAIModel } from "../../mongoose/schemas/aiModel";

export default class AIModelDTO {
    id;
    name;
    provider;

    constructor(model: IAIModel){
        this.id = model._id;
        this.name = model.name;
        this.provider = model.provider;
    }
};