import { Schema, model } from "mongoose";
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
    _id: Schema.Types.ObjectId,
    provider: Schema.Types.ObjectId,
    name: string
}
