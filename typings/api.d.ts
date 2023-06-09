import { IStoreModel, IUserModel } from "@typings/models.d";

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
    stores?: IStoreModel[]
    error?: string;
}

export type IRegisterOwnerAPI = (data: IRegisterOwnerBody) => Promise<IRegisterOwnerResponse>

export interface IGetUserResponse {
    currentUser?: IUserModel;
}

export interface IFetchStoresAPI {
    stores: IStoreModel[]
}

export type IGetUserAPI = () => Promise<IGetUserResponse>