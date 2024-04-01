import axios from "axios";
const APIBase=axios.create({
    baseURL:"http://localhost:8085/",
    headers:{
        withCredentials: true,
        credentials: 'include'
    }
})
export default APIBase;