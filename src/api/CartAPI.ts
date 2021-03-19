import BaseAPI, { RPromise } from './BaseAPI'

import { CartProductPreview } from '../types'
import { HttpStatusCode } from '../utils'

const CART_PATH = '/cart'

export interface CartService {
    update: (form: UpdateCartForm) => RPromise
    remove: (productId: number) => RPromise
    clear: () => RPromise
    current: () => RPromise<CartProductPreview[]>
}

export interface UpdateCartForm {
    productId: number
    amount: number
    add: boolean
}

export default class CartAPI extends BaseAPI implements CartService {
    current = () => this.get<CartProductPreview[]>(CART_PATH)

    update = (form: UpdateCartForm) =>
        this.post(CART_PATH, form, [HttpStatusCode.NotFound])

    remove = (productId: number) => this.delete(CART_PATH, { productId })

    clear = () => this.delete(`${CART_PATH}/all`)
}
