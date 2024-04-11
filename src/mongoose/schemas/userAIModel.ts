import { Schema, model } from "mongoose";

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
    name: string
}
