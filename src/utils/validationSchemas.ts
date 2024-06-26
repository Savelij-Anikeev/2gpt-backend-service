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

export const AIProviderValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name cannot be empty"
        },
        isString: {
            errorMessage: "Name should be string"
        },
    }
}

export const AIModelValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name cannot be empty"
        },
        isString: {
            errorMessage: "Name should be string"
        },
    },
    provider: {
        notEmpty: {
            errorMessage: "Provider cannot be empty"
        },
        isString: {
            errorMessage: "Provider should be string"
        },   
    }
}

export const AIModelValidationSchemaPatch = {
    name: {
        isString: {
            errorMessage: "Name should be string"
        },
    },
    provider: {
        isString: {
            errorMessage: "Provider should be string"
        },   
    }
}

export const UserAIModelValidationSchema = {
    user: {
        isString: {
            errorMessage: "User should be string value"
        },
        notEmpty: {
            errorMessage: "User cannot be empty"
        },
    },
    model: {
        isString: {
            errorMessage: "Model should be string value"
        },
        notEmpty: {
            errorMessage: "Model cannot be empty"
        },
    },
    context: {
        isString: {
            errorMessage: "Context should be JSON"
        },
        notEmpty: {
            errorMessage: "Context cannot be empty"
        },
    },
} 