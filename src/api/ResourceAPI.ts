import BaseAPI, { RPromise } from './BaseAPI'

export interface ResourceService {
    load: (path: string) => RPromise<any>
}

export default class ResourceAPI extends BaseAPI implements ResourceService {
    load = (path: string) =>
        this.get<any>(`/${path}`, undefined, undefined, {
            responseType: 'blob',
        })
}
