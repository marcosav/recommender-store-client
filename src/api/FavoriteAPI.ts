import BaseAPI, { RPromise } from './BaseAPI'

import { PreviewProduct, User } from '../types'

import { Paged, PagedParams } from './types'
import { HttpStatusCode } from '../utils'

export interface FavoriteService {
    getForUser: (
        params: PagedParams,
        product?: boolean
    ) => RPromise<Paged<PreviewProduct | User>>
    add: (id: number, product?: boolean) => RPromise
    remove: (id: number, product?: boolean) => RPromise
}

const FAVORITES_PATH = '/favorites'
const FAV_PRODUCTS_PATH = '/products'
const FAV_VENDORS_PATH = '/vendors'

export default class FavoritesAPI extends BaseAPI implements FavoriteService {
    getForUser = (params: PagedParams, product: boolean = true) =>
        this.get<Paged<PreviewProduct | User>>(this.u(product), params)

    add = (id: number, product: boolean = true) =>
        this.post(this.u(product), { id }, [HttpStatusCode.NotFound])

    remove = (id: number, product: boolean = true) =>
        this.delete(this.u(product), { id })

    private u = (product: boolean) =>
        `${FAVORITES_PATH}${product ? FAV_PRODUCTS_PATH : FAV_VENDORS_PATH}`
}
