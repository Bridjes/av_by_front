import axios from "axios";

export const API_URL = 'http://127.0.0.1:8000'

// инстанс запросов
const $api = axios.create({
    withCredentials: true,  // прицеплять к каждому запросу cookie
    baseURL: API_URL
})

// перехватчик запросов
$api.interceptors.request.use((config)=> {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`
    return config
})

export default $api