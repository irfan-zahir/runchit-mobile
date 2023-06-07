import { IUserModel } from "@typings/models.d";

// type IRegisterShopBody = Omit<IModelRunchit, "id", "createdAt">

interface IRegisterOwnerBody {
    fullName: string;
    stores: IRegisterShopBody[]
}

interface IRegisterOwnerResponse {
    createdUser: IUserModel;
    error?: string;
}

export interface ICurrentUserResponse {
    message?: string;
    currentUser?: IUserModel;
    error?: string;
}

export type IRegisterOwnerAPI = (data: IRegisterOwnerBody) => Promise<IRegisterOwnerResponse>

export interface IGetUserResponse {
    currentUser?: IUserModel;
}

export type IGetUserAPI = () => Promise<IGetUserResponse>