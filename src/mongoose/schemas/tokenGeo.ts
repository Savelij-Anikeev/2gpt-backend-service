import * as mongoose from "mongoose";

import { Token } from "./token";
import { User } from "./user";

const TokenGeoSchema = new mongoose.Schema({
    user: {
        ref: User,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    refresh: {
        ref: Token,
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userAgent: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    userIP: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

export const TokenGeo = mongoose.model("TokenGeo", TokenGeoSchema);
export interface ITokenGeo {
    user: string
    refresh: string
    userAgent: string
    userIP: string
}