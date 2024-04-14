import { Schema, model, Types } from "mongoose";
import { AIProvider } from "./aiProvider";

const schema = new Schema({
    provider: {
        type: Schema.Types.ObjectId,
        ref: AIProvider
    },
    name: {
        type: Schema.Types.String,
        required: true
    }
})

export const AIModel = model("AIModel", schema);

export interface IAIModel {
    _id: Types.ObjectId,
    provider: Types.ObjectId,
    name: string
}
