import axios from "axios"
import {
    ICurrentUserResponse,
    IGetUserAPI,
    IGetUserResponse,
    IRegisterOwnerAPI, IRegisterOwnerResponse
} from "@typings/api.d"

export const landingAuthentication = () => axios.get<ICurrentUserResponse>("/auth").then(({ data }) => data)

export const registerOwner: IRegisterOwnerAPI = (data) =>
    axios.post<IRegisterOwnerResponse>("/auth", data).then(({ data }) => data)

export const getUserAPI: IGetUserAPI = () => axios.get<IGetUserResponse>("/user").then(({ data }) => data)