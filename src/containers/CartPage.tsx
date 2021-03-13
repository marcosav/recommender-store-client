import React from 'react'

import Button from '@material-ui/core/Button'

import { Session, useCartService } from '../services'

interface CartPageParams {
    session: Session
}

const CartPage: React.FC<CartPageParams> = ({ session }) => {
    const cartService = useCartService()

    return (
        <>
            <p>
                {session?.cart.map((p, i) => (
                    <Button
                        key={i}
                        onClick={() => cartService.remove(p.product.id)}
                    >
                        {p.product.name}
                    </Button>
                ))}
            </p>
        </>
    )
}

export default CartPage
