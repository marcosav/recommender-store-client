import BaseAPI, { RPromise } from './BaseAPI'

import { User } from '../types'

export interface UserService {
    login: (form: LoginForm) => RPromise<LoginResponse>
    signup: (form: SignupForm) => RPromise<LoginResponse>
    edit: (form: SignupForm) => RPromise
    getUser: (id: number) => RPromise<User>
    searchUsers: (search: SearchUser) => RPromise<User[]>
}

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

interface LoginResponse {
    token: string
    user: User
}

export default class UserAPI extends BaseAPI implements UserService {
    login = (form: LoginForm) => this.post<LoginResponse>('/login', form)

    signup = (form: SignupForm) => this.post<LoginResponse>('/signup', form)

    edit = (form: SignupForm) => this.put('/profile/edit', form)

    getUser = (id: number) => this.get<User>(`${USER_PATH}/${id}`)

    searchUsers = (search: SearchUser) =>
        this.get<User[]>(`${USER_PATH}/list`, search)
}
