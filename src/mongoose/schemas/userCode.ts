import { Schema, model } from "mongoose";
import { User } from "./user";


const UserCodeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    code: {
        type: Schema.Types.String,
        required: true
    },
    expiredAt: {
        type: Date,
        default: Date.now,
        expires: 60*3
    },
    isUsed: {
        type: Schema.Types.Boolean,
        default: false
    }
});

export const UserCode = model("UserCode", UserCodeSchema);
export interface IUserCode {
    user: Schema.Types.ObjectId
    code: string
    expiredAt: Date
    isUsed: boolean
}
