class HttpError extends Error {
    public status: number;
    public success: boolean;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.success = false;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export { HttpError };
