import React from 'react'

import { Session, useCartService, useFavoriteService } from '../../services'

import { ProductHolder, ContentWarn, Loading } from '../../components'

import { CartProductPreview, PreviewProduct } from '../../types'
import { CartService } from '../../api'

import { Typography, useTheme } from '@material-ui/core'

import { HttpStatusCode } from '../../utils'

import IconButton from '@material-ui/core/IconButton'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import UndoIcon from '@material-ui/icons/Undo'

import { useStyles } from './CartPage.style'
import { useTranslation } from 'react-i18next'

interface CartPageParams {
    session: Session
}

const CartProductActions: React.FC<{
    product: PreviewProduct
    cartService?: CartService
}> = ({ product, cartService }) => {
    const theme = useTheme()

    const [onCart, setOnCart] = React.useState<boolean>(
        product.onCartAmount !== undefined
    )

    const handleCart = async (e: any) => {
        e.stopPropagation()

        const r = await (onCart
            ? cartService!!.remove(product.id)
            : cartService!!.update({
                  productId: product.id,
                  amount: product.onCartAmount!!,
                  add: false,
              }))

        if (r.status !== HttpStatusCode.OK) return

        setOnCart(!onCart)
    }

    return (
        <IconButton size={'small'} onClick={handleCart}>
            {onCart ? (
                <RemoveShoppingCartIcon htmlColor={theme.palette.error.main} />
            ) : (
                <UndoIcon />
            )}
        </IconButton>
    )
}

const CartPage: React.FC<CartPageParams> = () => {
    const cartService = useCartService()
    const favService = useFavoriteService()

    const { t } = useTranslation()
    const classes = useStyles()

    const [products, setProducts] = React.useState<CartProductPreview[]>()

    React.useEffect(() => {
        const fetchProducts = async () => {
            const r = await cartService.current()

            setProducts(r.status === HttpStatusCode.OK ? r.data : [])
        }

        fetchProducts()
    }, [cartService])

    const EmptyCart = () => (
        <ContentWarn>
            <ShoppingCart />
            <Typography>{t('cart.empty')}</Typography>
        </ContentWarn>
    )

    return products !== undefined ? (
        products.length ? (
            <>
                {products!!.map((p, i: number) => {
                    p.product.onCartAmount = p.amount
                    return (
                        <ProductHolder
                            key={i}
                            product={p.product}
                            Actions={CartProductActions}
                            cartService={cartService}
                            favService={favService}
                        />
                    )
                })}
            </>
        ) : (
            <EmptyCart />
        )
    ) : (
        <Loading />
    )
}

export default CartPage
