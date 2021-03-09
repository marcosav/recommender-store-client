import axios from 'axios'

const API_URL = `https://${process.env.REACT_APP_API_URL}/api/v${process.env.REACT_APP_API_VERSION}`

const url = (path: string) => `${API_URL}${path}`

export default class BaseAPI {
    get = <T = null>(path: string, data?: any) =>
        axios.get<T>(url(path), { data })

    post = <T = null>(path: string, data?: any) =>
        axios.post<T>(url(path), data)

    put = <T = null>(path: string, data?: any) => axios.put<T>(url(path), data)

    delete = <T = null>(path: string, data?: any) =>
        axios.delete<T>(url(path), { data })
}
