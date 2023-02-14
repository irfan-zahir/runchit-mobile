import { IModelProduct } from "@typings/models";
import axios from "axios";

interface IProductCreateBody{
    product: {
        name: string;
        sku: string;
        price: string;
        attributes: {name: string; value: string}[];
        quantity: number;
        supplier: string;
    }
}

type ICreateShopResponse = {
    product: IModelProduct;
    error?: string
}

export const createProductAPI = (data:IProductCreateBody)=>axios.post<ICreateShopResponse>("/product/create", data).then(({data})=>data)