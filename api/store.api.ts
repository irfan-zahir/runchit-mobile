import { IModelRunchit } from "@typings/models.d";
import axios from "axios";

interface ICreateShopBody {
    stores: { name: string; address: string }[]
}

type ICreateShopResponse = {
    stores: Array<IModelRunchit>;
    error?: string
}

export const getStoresAPI = () => axios.get<Array<IModelRunchit>>("/store").then(({ data }) => data)

export const createStoreAPI = (stores: ICreateShopBody) => axios.post<ICreateShopResponse>("/store/create", stores).then(({ data }) => data)