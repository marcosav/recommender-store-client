import BaseAPI from './BaseAPI'

import { User } from './types'

const USER_PATH = '/user'

interface SearchUser {
    query: string
    page?: number
    category?: number
    order?: number
}

interface LoginForm {
    username: string
    password: string
}

interface SignupForm {
    id?: number
    name: string
    surname: string
    email?: string
    repeatedEmail?: string
    password: string
    repeatedPassword: string
    nickname: string
    description: string
    profileImage?: string
    profileImageExt?: string
}

export default class UserAPI extends BaseAPI {
    login = (form: LoginForm) => this.post<string>('/login', form)

    signup = (form: SignupForm) => this.post('/signup', form)

    edit = (form: SignupForm) => this.put('/profile/edit', form)

    getUser = (id: number) => this.get<User>(`${USER_PATH}/${id}`)

    searchUesrs = (search: SearchUser) =>
        this.get<User[]>(`${USER_PATH}/list`, search)
}
