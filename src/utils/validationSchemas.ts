export const UserValidationSchema = {
    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isString: {
            errorMessage: "Password should be string"
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Password shouldn't be shorter that 8 characters"
        }
    },
    email: {
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isString: {
            errorMessage: "Password should be string"
        }
    }
}