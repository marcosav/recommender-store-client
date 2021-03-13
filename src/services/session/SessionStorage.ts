import { CartProduct, User } from '../../types'
import { SessionStorageManager } from '../../utils'

type SessionCallback = (session?: Session) => void

export interface SessionStorage {
    session?: Session
    update: (token: string, user?: User) => void
    clear: () => void
    storedToken: () => string | null
    isLogged: () => boolean
    setCallback: (callback: SessionCallback) => void
}

export interface Session {
    sessionId: string
    userId?: number
    username?: string
    cart: CartProduct[]
}

export const SessionStorageImpl = () => {
    let session: Session | undefined
    let callback: SessionCallback | undefined

    let cookies = new SessionStorageManager()

    const update = (token: string) => {
        const decoded = decode(token)

        if (decoded) {
            const sessionId = decoded.sub
            const userId = decoded.uid
            const username = decoded.username
            const cart = JSON.parse(decoded.cart ?? '[]')

            if (!session) session = { sessionId, userId, username, cart }
            else {
                session.sessionId = sessionId
                session.userId = userId
                session.username = username
                session.cart = cart
            }
        }

        cookies.storeToken(token)

        if (callback) callback(session)
    }

    const isLogged = () => session?.userId !== undefined

    const storedToken = () => cookies.readToken()

    const clear = () => {
        cookies.remove()
        session = undefined
    }

    const setCallback = (cb: SessionCallback) => {
        callback = cb
    }

    const decode = (token: string): any => {
        try {
            return JSON.parse(atob(token.split('.')[1]))
        } catch (error) {
            return null
        }
    }

    return { session, update, clear, storedToken, isLogged, setCallback }
}
