import { type AxiosInstance } from 'axios'
import http from './http'

export default class HttpClient {
  http: AxiosInstance

  constructor() {
    this.http = http
  }

  async request(payload: any) {
    const result = await this.http.request(payload)
    return result
  }
}
