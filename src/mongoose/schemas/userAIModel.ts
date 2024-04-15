import { Schema, model, Types } from "mongoose";

import { User } from "./user";
import { AIModel } from "./aiModel";

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: AIModel
    },
    context: {
        type: JSON
    }
})

export const UserAIModel = model('UserAIModel', schema);

export interface IUserAIModel {
    _id: Types.ObjectId
    user: Types.ObjectId
    model: Types.ObjectId
    context: JSON
}
