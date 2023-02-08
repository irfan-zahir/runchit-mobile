import { IModelRunchit, IModelUser } from "@typings/models.d";

type IRegisterShopBody = Omit<IModelRunchit, "id", "createdAt">

interface IRegisterOwnerBody{
    fullName: string;
    shops: IRegisterShopBody[]
}

interface IRegisterOwnerResponse{
    user: IModelUser;
    stores: IModelRunchit
    error?: string;
}

export interface ICurrentUserResponse {
    message?: string;
    currentUser?: IModelUser;
    error?: string;
}

export type IRegisterOwnerAPI = (data: IRegisterOwnerBody)=> Promise<IRegisterOwnerResponse>