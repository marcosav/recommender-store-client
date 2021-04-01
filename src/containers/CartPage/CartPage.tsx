import React from 'react'

import {
    useCartService,
    useFavoriteService,
    useResourceService,
} from '../../services'

import { ContentWarn, Loading } from '../../components'

import { CartProductPreview } from '../../types'

import { HttpStatusCode } from '../../utils'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import PaymentIcon from '@material-ui/icons/Payment'

import { useStyles } from './CartPage.style'

import { useTranslation } from 'react-i18next'
import { RouteComponentProps } from 'react-router'

import CartProductHolder from './components'

const round = (n: number) => Math.round(n * 100) / 100

const CartPage: React.FC<RouteComponentProps> = ({ history }) => {
    const cartService = useCartService()
    const favService = useFavoriteService()
    const resources = useResourceService()

    const { t } = useTranslation()
    const classes = useStyles()

    const [products, setProducts] = React.useState<CartProductPreview[]>()

    const calcTotal = () =>
        round(
            products?.reduce<number>(
                (prev, prod) =>
                    (prev += prod.removed
                        ? 0
                        : prod.amount * prod.product.price),
                0
            ) ?? 0
        )

    const [total, setTotal] = React.useState<number>()

    const [size, setSize] = React.useState<number>(0)

    const updateTotal = () => {
        setTotal(calcTotal())
        updateSize()
    }
    const updateSize = () =>
        setSize(
            products?.reduce<number>(
                (pred, p) => (pred += p.removed ? 0 : 1),
                0
            ) ?? 0
        )

    React.useEffect(() => {
        const fetchProducts = async () => {
            const r = await cartService.current()

            setProducts(r.status === HttpStatusCode.OK ? r.data : [])
        }

        fetchProducts()
    }, [cartService])

    React.useEffect(() => {
        updateTotal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products])

    const EmptyCart = () => (
        <ContentWarn>
            <ShoppingCart />
            <Typography>{t('cart.empty')}</Typography>
        </ContentWarn>
    )

    return (
        <>
            <header className={classes.header}>
                <div>
                    <Typography
                        className={classes.title}
                        variant="h3"
                        component="h1"
                    >
                        {t('cart.title')}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="h5"
                        component="h2"
                    >
                        {size} {t('cart.items')}
                    </Typography>
                </div>
                <Paper variant="outlined" className={classes.buyHolder}>
                    <Typography variant="h6" component="p">
                        {t('cart.total')}
                        {`: ${total} €`}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        endIcon={<PaymentIcon />}
                    >
                        {t('cart.buy')}
                    </Button>
                </Paper>
            </header>
            <div className={classes.contentHolder}>
                {products !== undefined ? (
                    products.length ? (
                        <div className={classes.list}>
                            {products!!.map((p, i: number) => (
                                <CartProductHolder
                                    key={i}
                                    product={p}
                                    {...{
                                        cartService,
                                        favoriteService: favService,
                                        history,
                                        resources,
                                        updateTotal,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyCart />
                    )
                ) : (
                    <Loading />
                )}
            </div>
        </>
    )
}

export default CartPage
