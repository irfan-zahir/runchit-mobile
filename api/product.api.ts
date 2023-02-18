import { IModelProduct } from "@typings/models";
import axios from "axios";

interface IProductCreateBody {
    product: {
        name: string;
        sku: string;
        purchase: string;
        sellPrice: string;
        quantity: number;
        unit: string;
    }
}

type ICreateShopResponse = {
    product: IModelProduct;
    error?: string
}

export const getProductsAPI = () => axios.get<Array<IModelProduct>>("/product").then(({ data }) => data)

export const createProductAPI = (data: IProductCreateBody) => axios.post<ICreateShopResponse>("/product/create", data).then(({ data }) => data)