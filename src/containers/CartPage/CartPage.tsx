import React from 'react'

import {
    useCartService,
    useFavoriteService,
    useProductService,
    useResourceService,
    useSessionService,
} from '../../services'

import { ContentWarn, Loading, ProductSlider } from '../../components'

import { CartProductPreview, PreviewProduct } from '../../types'

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
    const productService = useProductService()
    const favService = useFavoriteService()
    const resources = useResourceService()
    const sessionService = useSessionService()

    const { t } = useTranslation()
    const classes = useStyles()

    const logged = sessionService.isLogged()
    const [favorites, setFavorites] = React.useState<PreviewProduct[]>()
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

    const updateTotal = () => setTotal(calcTotal())

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

    React.useEffect(() => {
        const fetchFavorites = async () => {
            // TODO
            const r = await favService.getForUser({ page: 0 })

            if (r.status === HttpStatusCode.OK)
                setFavorites((r.data.items as PreviewProduct[]).slice(0, 8))
        }

        if (logged) fetchFavorites()
    }, [favService, logged])

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
                        {products?.length} {t('cart.items')}
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
            {logged && (
                <div className={classes.bottom}>
                    <Typography
                        variant="h5"
                        component="h2"
                        color="textSecondary"
                    >
                        {t('cart.favorites')}
                    </Typography>
                    {favorites && (
                        <ProductSlider
                            {...{
                                products: favorites,
                                productService,
                                favService,
                            }}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default CartPage
