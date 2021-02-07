declare interface Request {
    user?: {
        id: string;
        username: string;
        password: string;
        isActive: boolean;
    }
}
