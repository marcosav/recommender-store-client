import axios, { AxiosResponse } from 'axios'

const API_URL = `https://${process.env.REACT_APP_API_URL}/api/v${process.env.REACT_APP_API_VERSION}`

const url = (path: string) => `${API_URL}${path}`

export type RPromise<T = null> = Promise<AxiosResponse<T>>
export type StatusHandler = (status: number) => boolean

export default class BaseAPI {
    get = <T = null>(
        path: string,
        params?: any,
        validateStatus?: StatusHandler
    ) => axios.get<T>(url(path), { params, validateStatus })

    post = <T = null>(path: string, params?: any) =>
        axios.post<T>(url(path), null, { params })

    put = <T = null>(path: string, params?: any) =>
        axios.put<T>(url(path), null, { params })

    delete = <T = null>(path: string, params?: any) =>
        axios.delete<T>(url(path), { params })
}
