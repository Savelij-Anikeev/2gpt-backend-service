import { Schema, Types, model } from "mongoose";

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    }
})

export const AIProvider = model('AIProvider', schema);

export interface IAIProvider {
    _id: Types.ObjectId
    name: string
}
