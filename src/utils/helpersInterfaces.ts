export interface IValidationError {
    "type": string
    "value": any
    "msg": string
    "path": string
    "location": string
}

export interface IRefactoredValidationErrors {
    "errors": {
        "field": string,
        "messages": string[]
    }[]
}
