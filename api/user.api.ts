import axios from "axios"
import { ICurrentUserResponse, IRegisterOwnerAPI, IRegisterOwnerResponse } from "@typings/api.d"

export const getCurrentUserData = () => axios.get<ICurrentUserResponse>("/user").then(({ data }) => data)

export const registerOwner: IRegisterOwnerAPI = (data) => 
    axios.post<IRegisterOwnerResponse>("/user/registration", data).then(({ data }) => data)