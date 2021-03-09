import axios from 'axios'
import BaseAPI from './BaseAPI'

export default class AuthAPI extends BaseAPI {
    interceptor?: number
    token?: string

    auth = async () => {
        const res = await this.post<string>('/auth')
        if (res.status === 200) {
            this.token = res.data
            this.setup()
        }
    }

    setup = () => {
        if (!this.interceptor)
            this.interceptor = axios.interceptors.request.use((req) => {
                req.headers.authorization = `Bearer ${this.token}`
                return req
            })
    }
}
