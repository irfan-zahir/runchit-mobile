import { ICreateProductAPI, IFetchProductsAPI, IQueryProductAPI } from "@typings/api.d";
import { IProductModel } from "@typings/models";
import axios from "axios";

export const fetchProductsAPI: IFetchProductsAPI = () => axios.get<IProductModel[]>("/product").then(({ data }) => data)

export const createProductAPI: ICreateProductAPI = (product) => axios.post("/product", product).then(({ data }) => data)

export const fetchProductSkuAPI: IQueryProductAPI = ({ sku }) => axios.get("/product", { params: { sku } }).then(({ data }) => data)