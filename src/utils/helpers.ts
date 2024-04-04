import bcryptjs from "bcryptjs";

const saltRounds: number = 10;

export const hashPassword = (password: string): string => {
    // manage to hash password
    const salt = bcryptjs.genSaltSync(saltRounds);
    return bcryptjs.hashSync(password, salt);
}

export const compareHashedPassword = (password: string, hashed: string): boolean => {
    // manage to compare password and hash
    return bcryptjs.compareSync(password, hashed);
}
