import { AuthAPI } from '../../api'

import { SessionStorage } from './SessionStorage'

import { AuthRequestInterceptor } from '../../utils'

export interface AuthService {
    isAuth: () => boolean
    auth: () => Promise<void>
    logout: () => Promise<void>
}

export const AuthServiceImpl = (sessionStorage: SessionStorage) => {
    const interceptor = new AuthRequestInterceptor()

    let isAuth = false

    const api = new AuthAPI()

    const auth = async () => {
        let token = sessionStorage.storedToken()

        if (!token) {
            const res = await api.auth()

            if (res.status === 200) token = res.data
        }

        if (token) {
            isAuth = true
            interceptor.setup(token, onToken)
            sessionStorage.update(token)
        }
    }

    const logout = async () => {
        interceptor.remove()
        sessionStorage.clear()

        await auth()
    }

    const onToken = (token: string) => {
        sessionStorage.update(token)
    }

    return { isAuth: () => isAuth, auth, logout }
}
