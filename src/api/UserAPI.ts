import BaseAPI, { RPromise } from './BaseAPI'

import { User, DetailedUser } from '../types'

export interface UserService {
    login: (form: LoginForm) => RPromise<LoginResponse>
    signup: (form: SignupForm, image: File, onUploadProgress: any) => RPromise
    edit: (form: SignupForm, image: File, onUploadProgress: any) => RPromise
    getUser: (id: number) => RPromise<User>
    getDetailedUser: (id: number) => RPromise<DetailedUser>
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

export interface SignupForm {
    id?: number
    name: string
    surname: string
    email?: string
    repeatedEmail?: string
    password: string
    repeatedPassword: string
    nickname: string
    description: string
}

interface LoginResponse {
    token: string
    user: User
}

export default class UserAPI extends BaseAPI implements UserService {
    login = (form: LoginForm) => this.post<LoginResponse>('/login', form)

    signup = (form: SignupForm, image: File, onUploadProgress: any) => {
        const formData = new FormData()

        formData.append('form', JSON.stringify(form))
        formData.append('file', image)

        return this.postMP('/signup', formData, undefined, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        })
    }

    edit = (form: SignupForm, image: File, onUploadProgress: any) => {
        const formData = new FormData()

        formData.append('form', JSON.stringify(form))
        formData.append('file', image)

        return this.putMP('/profile/edit', formData, undefined, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        })
    }

    getUser = (id: number) => this.get<User>(`${USER_PATH}/${id}`)

    getDetailedUser = (id: number) =>
        this.get<DetailedUser>(`${USER_PATH}/${id}`, { detailed: true })

    searchUsers = (search: SearchUser) =>
        this.get<User[]>(`${USER_PATH}/list`, search)
}
