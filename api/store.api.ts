import { IFetchStoresAPI } from "@typings/api.d";
import axios from "axios";

export const getStoresAPI = async () => axios.get<IFetchStoresAPI>("/store").then(({ data }) => data)