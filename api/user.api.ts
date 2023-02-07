import axios from "axios"
import { ICurrentUserResponse } from "@typings/api.d"

export const getCurrentUserData = () => axios.get<ICurrentUserResponse>("/user").then(({ data }) => data)