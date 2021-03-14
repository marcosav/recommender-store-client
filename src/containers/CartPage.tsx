import React from 'react'

import { Session, useCartService, useFavoriteService } from '../services'

import { ProductHolder } from '../components'

import { PreviewProduct } from '../types'
import { CartService } from '../api'

import { useTheme } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

interface CartPageParams {
    session: Session
}

const CartProductActions: React.FC<{
    product: PreviewProduct
    cartService?: CartService
}> = ({ product, cartService }) => {
    const theme = useTheme()

    const removeFromCart = (e: any) => {
        e.stopPropagation()
        cartService!!.remove(product.id)
    }

    return (
        <>
            <IconButton size={'small'} onClick={removeFromCart}>
                <RemoveShoppingCartIcon htmlColor={theme.palette.error.main} />
            </IconButton>
        </>
    )
}

const CartPage: React.FC<CartPageParams> = ({ session }) => {
    const cartService = useCartService()
    const favService = useFavoriteService()

    return (
        <>
            {session?.cart.map((p, i: number) => (
                <ProductHolder
                    key={i}
                    product={p.product}
                    Actions={CartProductActions}
                    cartService={cartService}
                    favService={favService}
                />
            ))}
        </>
    )
}

export default CartPage
