const TOKEN_COOKIE = 'token'
const TOKEN_LIFESPAN = 7

export default class SessionStorageManager {
    remove = () => localStorage.removeItem(TOKEN_COOKIE)

    readToken = () => localStorage.getItem(TOKEN_COOKIE)

    storeToken = (token: string) => {
        const date = new Date()
        date.setDate(date.getDate() + TOKEN_LIFESPAN)

        localStorage.setItem(TOKEN_COOKIE, token)
    }
}
