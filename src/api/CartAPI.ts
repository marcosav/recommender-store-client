import BaseAPI from './BaseAPI'

import { CartProduct } from '../types'

const CART_PATH = '/cart'

export interface CartService {
    update: (form: UpdateCartForm) => void
    remove: (productId: number) => void
    clear: () => void
}

export interface UpdateCartForm {
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
