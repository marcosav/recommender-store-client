import { CartProduct, User } from '../../types'
import { CookieSessionManager } from '../../utils'

type SessionCallback = (session?: Session) => void

export interface SessionStorage {
    session?: Session
    update: (token: string, user?: User) => void
    clear: () => void
    isLogged: () => boolean
    setCallback: (callback: SessionCallback) => void
}

export interface Session {
    sessionId: string
    userId?: number
    username?: string
    cart: CartProduct[]
}

export class SessionStorageImpl implements SessionStorage {
    session?: Session
    private callback?: SessionCallback

    private cookies = new CookieSessionManager()

    update = (token: string) => {
        const decoded = this.decode(token)
        if (decoded) {
            const sessionId = decoded.sub
            const userId = decoded.uid
            const username = decoded.username

            if (!this.session)
                this.session = { sessionId, userId, username, cart: [] }
            else {
                this.session.sessionId = sessionId
                this.session.userId = userId
                this.session.username = username
                this.session.cart = JSON.parse(decoded.cart ?? '[]')
            }
        }

        this.cookies.storeToken(token)

        if (this.callback) this.callback(this.session)
    }

    isLogged = () => this.session?.userId !== undefined

    storedToken = () => this.cookies.readToken()

    clear = () => {
        this.cookies.remove()
        this.session = undefined
    }

    setCallback = (callback: SessionCallback) => {
        this.callback = callback
    }

    private decode = (token: string): any => {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (error) {
            return null
        }
    }
}
