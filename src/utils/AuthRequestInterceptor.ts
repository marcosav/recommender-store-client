import axios from 'axios'

export default class AuthRequestinterceptor {
    private interceptorReq?: number
    private interceptorRes?: number

    private lastToken?: string

    setup = (token: string, onToken: (token: string) => void) => {
        this.lastToken = token

        if (this.interceptorReq !== undefined)
            axios.interceptors.request.eject(this.interceptorReq)

        this.interceptorReq = axios.interceptors.request.use((req) => {
            req.headers.authorization = `Bearer ${this.lastToken}`
            return req
        })

        this.setupTokenInterceptor(onToken)
    }

    remove = () => {
        if (this.interceptorReq !== undefined) {
            axios.interceptors.request.eject(this.interceptorReq)
            this.interceptorReq = undefined
        }

        if (this.interceptorRes !== undefined) {
            axios.interceptors.response.eject(this.interceptorRes)
            this.interceptorRes = undefined
        }
    }

    private setupTokenInterceptor = (onToken: (token: string) => void) => {
        if (this.interceptorRes !== undefined)
            axios.interceptors.response.eject(this.interceptorRes)

        this.interceptorRes = axios.interceptors.response.use((res) => {
            const token = res.data?.token
            if (token) {
                this.lastToken = token
                onToken(token)
            }
            return res
        })
    }
}
