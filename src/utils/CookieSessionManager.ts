import Cookies from 'universal-cookie'

const TOKEN_COOKIE = 'token'
const TOKEN_LIFESPAN = 7

export default class CookieSessionManager {
    private cookies = new Cookies()

    remove = () => this.cookies.remove(TOKEN_COOKIE)

    readToken = () => this.cookies.get(TOKEN_COOKIE)

    storeToken = (token: string) => {
        if (this.readToken() === token) return
        
        const date = new Date()
        date.setDate(date.getDate() + TOKEN_LIFESPAN)

        this.cookies.set(TOKEN_COOKIE, token, {
            path: '/',
            secure: true,
            expires: date,
        })
    }
}
