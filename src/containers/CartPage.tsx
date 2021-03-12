import React from 'react'

import { useCartService, useSessionService } from '../services'

const CartPage = ({ session }: any) => {
    const cartService = useCartService()

    return <>{JSON.stringify(session)}</>
}

export default CartPage
