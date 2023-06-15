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

interface ICreateProductBody {
    name: string
    purchase?: number | null
    unitPrice?: number | null
    sku?: string | null
    storageQuantity?: Prisma.Decimal | null
    shelfQuantity?: Prisma.Decimal | null
    storeId: string
}

export type ICreateProductAPI = (product: ICreateProductBody) => Promise<IProductModel>

export type IFetchProductsAPI = () => Promise<IProductModel[]>

interface IProductQuery {
    sku?: string;
    categories?: string[];
}

export type IQueryProductAPI = (query: IProductQuery) => Promise<IProductModel[]>