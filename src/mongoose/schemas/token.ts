import mongoose, { Schema } from "mongoose";
import { User } from "./user";

const TokenSchema: Schema = new Schema({
    user: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    },
    refreshToken: {
        type: Schema.Types.String,
        required: true
    },
    accessToken: {
        type: Schema.Types.String,
        required: true
    },
    expiredAt: {
        type: Date,
        default: Date.now,
        expires: 60*60*24*30
    }
});

export const Token = mongoose.model("Token", TokenSchema);

export interface IToken {
    user: string
    refreshToken: string
    accessToken: string
    expiredAt: Date
}