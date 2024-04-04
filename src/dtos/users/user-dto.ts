import {IUser} from "../../mongoose/schemas/user";

export default class UserDTO {
    email;
    username;
    id;
    isActivated;

    constructor(model: IUser) {
        this.id = model._id;
        this.email = model.email;
        this.username = model.username;
        this.isActivated = model.isActivated;
    }
}