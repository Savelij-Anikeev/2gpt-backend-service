import bcryptjs from "bcryptjs";
import url from "url";
import { Request } from "express-serve-static-core";

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

export const getFullUrl = (req: Request) => {
    // function for getting full url
    return url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl.split('?')[0]
    });
}

export const getPaginatedResponse = (offset: number, limit: number, data: any, dataLength: number, url: string) => {
    // getting max amount of elements on one page
    const pageCount = Number(process.env.PAGINATION_COUNT);

    // initializing variables for next and previous pages
    let prevPage: string | undefined = undefined;
    let nextPage: string | undefined = undefined;

    // defining variables
    if (!(dataLength < pageCount)) {
        nextPage = `${url}?offset=${limit}${limit === undefined ? `&limit=${pageCount*2}` : `&limit=${limit + pageCount}`}`;
    }
    if (offset !== 0) {
        prevPage = `${url}?offset=${offset ? offset - pageCount : 0 }${limit ? `&limit=${limit - pageCount}` : ''}`;
    }

    return { next: nextPage, prev: prevPage, result: data }
}
