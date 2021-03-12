import axios from 'axios'

export default class AuthRequestinterceptor {
    private interceptor?: number

    setup = (token: string, onToken: (token: string) => void) => {
        if (this.interceptor !== undefined)
            axios.interceptors.request.eject(this.interceptor)

        this.interceptor = axios.interceptors.request.use((req) => {
            console.debug('request')
            req.headers.authorization = `Bearer ${token}`
            return req
        })

        this.setupTokenInterceptor(onToken)
    }

    remove = () => {
        if (this.interceptor !== undefined) {
            axios.interceptors.request.eject(this.interceptor)
            this.interceptor = undefined
        }
    }

    private setupTokenInterceptor = (onToken: (token: string) => void) => {
        this.interceptor = axios.interceptors.response.use((res) => {
            const token = res.data?.token
            if (token) onToken(token)
            return res
        })
    }
}
