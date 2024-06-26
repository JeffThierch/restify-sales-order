import axios, { type InternalAxiosRequestConfig } from 'axios'

const host = import.meta.env.VITE_API_ENDPOINT ?? process.env.VITE_API_ENDPOINT

const axiosInstance = axios.create({
  baseURL: host
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //if (host) config.headers['Access-Control-Allow-Origin'] = host

    return config
  },
  (response: any) => Promise.reject(response)
)

export default axiosInstance
