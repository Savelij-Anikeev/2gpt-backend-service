import {IUser} from "../../mongoose/schemas/user";

export default class UserDTO {
    email;
    username;
    id;
    isActivated;
    isAdmin;

    constructor(model: IUser) {
        this.id = model._id;
        this.email = model.email;
        this.username = model.username;
        this.isActivated = model.isActivated;
        this.isAdmin = model.isAdmin;
    }
}