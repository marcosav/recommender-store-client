import BaseAPI from './BaseAPI'

import { Product, User } from './types'

const FAVORITES_PATH = '/favorites'
const FAV_PRODUCTS_PATH = '/products'
const FAV_VENDORS_PATH = '/vendors'

export default class FavoritesAPI extends BaseAPI {
    getForUser = (product: boolean = true) =>
        this.get<Product[] | User[]>(this.u(product))

    add = (id: number, product: boolean = true) =>
        this.post(this.u(product), { id })

    remove = (id: number, product: boolean = true) =>
        this.delete(this.u(product), { id })

    private u = (product: boolean) =>
        `${FAVORITES_PATH}${product ? FAV_PRODUCTS_PATH : FAV_VENDORS_PATH}`
}
