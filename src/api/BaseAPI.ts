import axios, { AxiosResponse } from 'axios'

import { HttpStatusCode, serverErrorHandler } from '../utils'

const API_URL = `${process.env.REACT_APP_API_URL}/v${process.env.REACT_APP_API_VERSION}`
export const RECOMMENDER_API_URL = `${process.env.REACT_APP_ENGINE_API_URL}/v${process.env.REACT_APP_RECOMMENDER_API_VERSION}`

export type RPromise<T = null> = Promise<AxiosResponse<T>>
export type StatusHandler = (status: number) => boolean

const DEFAULT_HANDLED = [
    HttpStatusCode.ServerError,
    HttpStatusCode.Unauthorized,
]

const emptyStatusValidation = (h?: number[]) => (code: number) => {
    let handled = h ? [...DEFAULT_HANDLED, ...h] : DEFAULT_HANDLED
    let exceptions = h?.filter((v) => DEFAULT_HANDLED.includes(v)) ?? []
    if (handled.includes(code) && !exceptions.includes(code))
        serverErrorHandler.handle(code)

    return true
}

export default class BaseAPI {
    baseUrl: string

    constructor(baseUrl: string = API_URL) {
        this.baseUrl = baseUrl
    }

    protected getImage = (path: string) =>
        axios.get(path, {
            headers: { amz: 'amz' },
            validateStatus: (code: number) => true,
            responseType: 'blob',
        })

    protected get = <T = null>(
        path: string,
        params?: any,
        handled?: number[],
        options: any = {}
    ) =>
        axios.get<T>(this.url(path), {
            params,
            validateStatus: emptyStatusValidation(handled),
            ...options,
        })

    protected post = <T = null>(
        path: string,
        params?: any,
        handled?: number[],
        options: any = {}
    ) =>
        axios.post<T>(this.url(path), null, {
            params,
            validateStatus: emptyStatusValidation(handled),
            ...options,
        })

    protected postMP = <T = null>(
        path: string,
        data: any,
        handled?: number[],
        options: any = {}
    ) =>
        axios.post<T>(this.url(path), data, {
            validateStatus: emptyStatusValidation(handled),
            ...options,
        })

    protected put = <T = null>(
        path: string,
        params?: any,
        handled?: number[],
        options: any = {}
    ) =>
        axios.put<T>(this.url(path), null, {
            params,
            validateStatus: emptyStatusValidation(handled),
            ...options,
        })

    protected putMP = <T = null>(
        path: string,
        data: any,
        handled?: number[],
        options: any = {}
    ) =>
        axios.put<T>(this.url(path), data, {
            validateStatus: emptyStatusValidation(handled),
            ...options,
        })

    protected delete = <T = null>(
        path: string,
        params?: any,
        handled?: number[],
        options: any = {}
    ) =>
        axios.delete<T>(this.url(path), {
            params,
            validateStatus: emptyStatusValidation(handled),
            ...options,
        })

    private url = (path: string) => `${this.baseUrl}${path}`
}
