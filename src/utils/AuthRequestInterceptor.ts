import axios from 'axios'

export default class AuthRequestinterceptor {
    private interceptor?: number

    setup = (token: string) => {
        if (this.interceptor !== undefined)
            axios.interceptors.request.eject(this.interceptor)

        this.interceptor = axios.interceptors.request.use((req) => {
            console.debug('request')
            req.headers.authorization = `Bearer ${token}`
            return req
        })
    }

    remove = () => {
        if (this.interceptor !== undefined) {
            axios.interceptors.request.eject(this.interceptor)
            this.interceptor = undefined
        }
    }
}
