import BaseAPI, { RPromise } from './BaseAPI'

import { CartProduct } from '../types'

export interface CartService {
    current: () => RPromise<CartProduct[]>
    update: (form: UpdateCartForm) => RPromise<CartResponse>
    remove: (productId: number) => RPromise<CartResponse>
    clear: () => RPromise<CartResponse>
}

const CART_PATH = '/cart'

interface UpdateCartForm {
    productId: number
    amount: number
    add: boolean
}

type CartResponse = null | string

export default class CartAPI extends BaseAPI implements CartService {
    current = () => this.get<CartProduct[]>(CART_PATH)

    update = (form: UpdateCartForm) => this.post<CartResponse>(CART_PATH, form)

    remove = (productId: number) =>
        this.delete<CartResponse>(CART_PATH, { productId })

    clear = () => this.delete<CartResponse>(`${CART_PATH}/all`)
}
