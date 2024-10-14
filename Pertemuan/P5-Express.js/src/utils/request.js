class BadRequestError extends Error {
    constructor(errors) {
        super("Validation failed!");
        this.errors = errors;
        this.status = 400;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        if (message) {
            super(message);
        } else {
            super("Data is Not Found!");
        }
        this.status = 404;
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
};