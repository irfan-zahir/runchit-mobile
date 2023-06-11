import { IFetchStoresAPI } from "@typings/api.d";
import axios from "axios";

export const fetchStoresAPI = async () => axios.get<IFetchStoresAPI>("/store").then(({ data }) => data)

// export const createStoreAPI = async () => axios.post("/store").then(({ data }) => data)