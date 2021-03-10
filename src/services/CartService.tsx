import React from 'react'

import { CartAPI, CartService } from '../api'

export const CartContext = React.createContext<CartService>(new CartAPI())

const useCartService = () => React.useContext(CartContext)

export default useCartService
