import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
    username: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    activationLink: {
        type: Schema.Types.String,
    },
    isActivated: { 
        type: Schema.Types.Boolean,
        default: false
    },
    isAdmin: {
        type: Schema.Types.Boolean,
        default: false,
        required: true
    }

});

export const User = mongoose.model("User", UserSchema)
export interface IUser {
    _id: string
    username: string
    email: string
    password: string
    activationLink: string
    isActivated: boolean
    isAdmin: boolean
}