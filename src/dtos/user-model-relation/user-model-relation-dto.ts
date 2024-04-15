import { Types } from "mongoose";

import { UserAIModel, IUserAIModel } from "../../mongoose/schemas/userAIModel";

export default class UserAIModelDTO {
    id: Types.ObjectId;
    user: Types.ObjectId;
    model: Types.ObjectId;
    context: JSON

    constructor (model: IUserAIModel) {
        this.id = model._id,
        this.user = model.user;
        this.model = model.model;
        this.context = model.context;
    }

}
