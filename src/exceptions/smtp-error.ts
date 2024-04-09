export default class SMTPError extends Error {
    status;
    errors;

    constructor(status: number | 500, message: string, errors: Error[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static SendError(message: string, errors: Error[] = []) {
        return new SMTPError(500, message, errors);
    }

    static CantLoadTemplateError(message: string, errors: Error[] = []) {
        return new SMTPError(500, message, errors);
    }
}