import axios from "axios";
const APIBase = axios.create({
    baseURL: "http://localhost:8085/",
    withCredentials: true,
    headers: {
        credentials: 'include'
    }
})
export default APIBase;