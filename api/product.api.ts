import { ICreateProductAPI, IFetchProductsAPI } from "@typings/api.d";
import { IProductModel } from "@typings/models";
import axios from "axios";

export const fetchProductsAPI: IFetchProductsAPI = () => axios.get<IProductModel[]>("/product").then(({ data }) => data)

export const createProductAPI: ICreateProductAPI = (product) => axios.post("/product", product).then(({ data }) => data)