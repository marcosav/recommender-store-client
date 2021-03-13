import BaseAPI, { RPromise } from './BaseAPI'

import { PreviewProduct, User } from '../types'

export interface FavoriteService {
    getForUser: (product: boolean) => RPromise<PreviewProduct[] | User[]>
    add: (id: number, product: boolean) => RPromise
    remove: (id: number, product: boolean) => RPromise
}

const FAVORITES_PATH = '/favorites'
const FAV_PRODUCTS_PATH = '/products'
const FAV_VENDORS_PATH = '/vendors'

export default class FavoritesAPI extends BaseAPI implements FavoriteService {
    getForUser = (product: boolean = true) =>
        this.get<PreviewProduct[] | User[]>(this.u(product))

    add = (id: number, product: boolean = true) =>
        this.post(this.u(product), { id })

    remove = (id: number, product: boolean = true) =>
        this.delete(this.u(product), { id })

    private u = (product: boolean) =>
        `${FAVORITES_PATH}${product ? FAV_PRODUCTS_PATH : FAV_VENDORS_PATH}`
}
