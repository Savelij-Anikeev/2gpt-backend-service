import {IUser, User} from "../mongoose/schemas/user";
import { hashPassword, compareHashedPassword } from "../utils/helpers"
import * as uuid from 'uuid';
import APIError from "../exceptions/api-error";

class UserService {
    async create(email: string, password: string): Promise<IUser> {
            const username = "@user-" + uuid.v4().slice(0, 12);
            const hashedPassword: string = hashPassword(password);
            const user = await User.create({email, password: hashedPassword, username});

            return user.toObject();
    }
    async getUser(email: string, password: string): Promise<IUser> {
        const user = await User.findOne({email}).exec();

        if (!user) {
            throw APIError.BadRequestError('user not found');
        }

        return user.toObject();
    }
    async getUserById(id: string) : Promise<IUser>{
        const user = await User.findOne({_id: id}).exec();

        if (!user) {
            throw APIError.BadRequestError('user not found');
        }

        return user.toObject();
    }
    async getList(offset: number | undefined, limit: number | undefined): Promise<IUser[]> {
        let users: IUser[] = await User.find();

        if (offset && limit) {
            return users.slice(offset, limit);
        } else if (offset) {
            return users.slice(offset, users.length);
        } else if (limit) {
            return users.slice(0, limit);
        }
        return users;
    }
}

export default new UserService();