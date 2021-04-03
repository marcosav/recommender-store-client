import BaseAPI, { RPromise } from './BaseAPI'

import { CartProductPreview, UserAddress } from '../types'

const CART_PATH = '/cart'
const CHECKOUT_PATH = '/checkout'

export interface CartService {
    update: (form: UpdateCartForm) => RPromise
    remove: (productId: number) => RPromise
    clear: () => RPromise
    current: () => RPromise<CartProductPreview[]>
    checkout: (address: UserAddress) => RPromise<{ orderId: number }>
}

export interface UpdateCartForm {
    productId: number
    amount: number
    add: boolean
}

export default class CartAPI extends BaseAPI implements CartService {
    current = () => this.get<CartProductPreview[]>(CART_PATH)

    update = (form: UpdateCartForm) => this.post(CART_PATH, form)

    remove = (productId: number) => this.delete(CART_PATH, { productId })

    clear = () => this.delete(`${CART_PATH}/all`)

    checkout = (address: UserAddress) =>
        this.post<{ orderId: number }>(CHECKOUT_PATH, address)
}
