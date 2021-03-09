import BaseAPI from './BaseAPI'

import { CartProduct } from './types'

const CART_PATH = '/cart'

interface UpdateCartForm {
    productId: number
    amount: number
    add: boolean
}

type CartResponse = null | string

export default class CartAPI extends BaseAPI {
    current = () => this.get<CartProduct[]>(CART_PATH)

    update = (form: UpdateCartForm) => this.post<CartResponse>(CART_PATH, form)

    remove = (productId: number) =>
        this.delete<CartResponse>(CART_PATH, { productId })

    clear = () => this.delete<CartResponse>(`${CART_PATH}/all`)
}
