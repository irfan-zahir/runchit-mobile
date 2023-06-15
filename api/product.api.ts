import { ICreateProductAPI, IDeleteProductAPI, IFetchProductsAPI, IFetchUniqueProductAPI, IQueryProductAPI, IUpdateProductAPI } from "@typings/api.d";
import { IProductModel } from "@typings/models";
import axios from "axios";

export const fetchProductsAPI: IFetchProductsAPI = () => axios.get<IProductModel[]>("/product").then(({ data }) => data)

export const createProductAPI: ICreateProductAPI = (product) => axios.post("/product", product).then(({ data }) => data)

export const fetchProductSkuAPI: IQueryProductAPI = ({ sku }) => axios.get("/product", { params: { sku } }).then(({ data }) => data)

export const fetchUniqueProductAPI: IFetchUniqueProductAPI = (productId: string) => axios.get(`/product/${productId}`).then(({ data }) => data)

export const deleteProductAPI: IDeleteProductAPI = (productId: string) => axios.delete(`/product/${productId}`).then(({ data }) => data)

export const updateProductAPI: IUpdateProductAPI = (product) => axios.patch(`/product/${product.id}`, product).then(({ data }) => data)