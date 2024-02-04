import axios from "axios"

const BASEURL="http://localhost:5000"
export let axiosInstance=axios.create({
    baseURL:BASEURL,
    withCredentials:true
})