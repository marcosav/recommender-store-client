import axios, { AxiosResponse } from 'axios'

import { serverErrorHandler } from '../utils'

const API_URL = `https://${process.env.REACT_APP_API_URL}/api/v${process.env.REACT_APP_API_VERSION}`

const url = (path: string) => `${API_URL}${path}`

export type RPromise<T = null> = Promise<AxiosResponse<T>>
export type StatusHandler = (status: number) => boolean

const emptyStatusValidation = (code: number) => {
    if (code === 500) serverErrorHandler.handle()

    return true
}

export default class BaseAPI {
    protected get = <T = null>(path: string, params?: any, options: any = {}) =>
        axios.get<T>(url(path), {
            params,
            validateStatus: emptyStatusValidation,
            ...options,
        })

    protected post = <T = null>(
        path: string,
        params?: any,
        options: any = {}
    ) =>
        axios.post<T>(url(path), null, {
            params,
            validateStatus: emptyStatusValidation,
            ...options,
        })

    protected postMP = <T = null>(path: string, data: any, options: any = {}) =>
        axios.post<T>(url(path), data, {
            validateStatus: emptyStatusValidation,
            ...options,
        })

    protected put = <T = null>(path: string, params?: any, options: any = {}) =>
        axios.put<T>(url(path), null, {
            params,
            validateStatus: emptyStatusValidation,
            ...options,
        })

    protected putMP = <T = null>(path: string, data: any, options: any = {}) =>
        axios.put<T>(url(path), data, {
            validateStatus: emptyStatusValidation,
            ...options,
        })

    protected delete = <T = null>(
        path: string,
        params?: any,
        options: any = {}
    ) =>
        axios.delete<T>(url(path), {
            params,
            validateStatus: emptyStatusValidation,
            ...options,
        })
}
