import axios from "axios"
import Constants from "expo-constants";
const { manifest } = Constants;

export const initializeAxios = (userToken: string, currentRole?: string, currentStore?: string) => {
    axios.defaults.baseURL = `http://${manifest!.debuggerHost?.split(':').shift()}:3003/api/v1`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`
    axios.defaults.validateStatus = (status) => status < 400
    axios.defaults.headers.common["Current-Role"] = currentRole ?? ""
    axios.defaults.headers.common["Current-Store"] = currentStore ?? ""
}