export default class APIError extends Error {
    status;
    errors;

    constructor(status: number, message: string, errors: Error[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(message: string = "unauthorized error", errors: Error[] = []) {
        return new APIError(401, message);
    }

    static BadRequestError(message: string, errors: Error[] = []) {
        return new APIError(400, message, errors);
    }
}