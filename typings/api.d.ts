import { IProductModel, IStoreModel, IUserModel } from "@typings/models.d";

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

export type IGetUserAPI = () => Promise<IGetUserResponse>

export interface IFetchStoresAPI {
    stores: IStoreModel[]
}

export type ICreateProductAPI = (product: Omit<IProductModel, "id", "images">) => Promise<IProductModel>

export type IFetchProductsAPI = () => Promise<IProductModel[]>

interface IProductQuery {
    sku?: string;
    categories?: string[];
}

export type IQueryProductAPI = (query: IProductQuery) => Promise<IProductModel[]>

export type IFetchUniqueProductAPI = (productId: string) => Promise<IProductModel>

export type IDeleteProductAPI = (productId: string) => Promise<IProductModel>

export type IUpdateProductAPI = (product: IProductModel) => Promise<IProductModel>