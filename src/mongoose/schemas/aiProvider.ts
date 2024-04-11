import { Schema, model } from "mongoose";

const schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    }
})

export const AIProvider = model('AIProvider', schema);

export interface IAIProvider {
    name: string
}
