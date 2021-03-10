import { AuthAPI } from '../../api'

import { SessionStorage } from './SessionStorage'

import { AuthRequestInterceptor } from '../../utils'

export interface AuthService {
    isAuth: boolean
    auth: () => Promise<void>
    logout: () => Promise<void>
}

export class AuthServiceImpl implements AuthService {
    private interceptor = new AuthRequestInterceptor()

    isAuth: boolean = false

    private api = new AuthAPI()

    private sessionStorage

    constructor(sessionStorage: SessionStorage) {
        this.sessionStorage = sessionStorage
    }

    auth = async () => {
        console.debug('auth start')
        let token = this.sessionStorage.storedToken()
        if (!token) {
            const res = await this.api.auth()

            if (res.status === 200) token = res.data
        }

        if (token) {
            this.isAuth = true
            this.interceptor.setup(token)
            this.sessionStorage.update(token)
        }
    }

    logout = async () => {
        this.interceptor.remove()
        this.sessionStorage.clear()

        await this.auth()
    }
}
