

export interface IDatabaseUser {
    id: string;
    phone: string;
    subscription: string | null;
    store: any;
    eligibilities: any;
}

export interface ICurrentUserResponse {
    message?: string;
    currentUser?: IDatabaseUser;
    error?: string;
}