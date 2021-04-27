import BaseAPI, { RPromise } from './BaseAPI'

import { HttpStatusCode } from '../utils'
import { PreviewProduct } from '../types'

export interface RecommenderService {
    getFor: (product?: number) => RPromise<PreviewProduct[]>
}

export default class RecommenderAPI
    extends BaseAPI
    implements RecommenderService {
    getFor = (product?: number) =>
        this.get<PreviewProduct[]>(`/recommended`, { product }, [
            HttpStatusCode.ServerError,
            HttpStatusCode.Unauthorized,
        ])
}
