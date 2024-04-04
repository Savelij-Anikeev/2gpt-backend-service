import * as express from 'express-serve-static-core';
import UserDTO from "./src/dtos/users/user-dto";


// u can implement custom fields to `express` interfaces
declare global {
    namespace Express {
        interface Request {
            user: UserDTO | undefined
        }
    }
}