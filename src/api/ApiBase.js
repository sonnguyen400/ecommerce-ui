import axios from "axios";
export const BaseURL = "http://gadgetsource.click";
const APIBase = axios.create({
    baseURL: BaseURL,
    withCredentials: true,
    headers: {
        credentials: 'include'
    }
})
export default APIBase;