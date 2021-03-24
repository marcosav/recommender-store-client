import React from 'react'

import { RouteComponentProps } from 'react-router'

import {
    useCartService,
    useFavoriteService,
    useProductService,
} from '../../services'

import { PreviewProduct, Product } from '../../types'
import { HttpStatusCode, Constants } from '../../utils'

import useTheme from '@material-ui/core/styles/useTheme'
import { Loading, ProductSlider } from '../../components'

import { useTranslation } from 'react-i18next'

import Rating from '@material-ui/lab/Rating'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import EditOutlined from '@material-ui/icons/EditOutlined'
import ReportOutlined from '@material-ui/icons/ReportOutlined'
import Favorite from '@material-ui/icons/Favorite'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'

import { useStyles } from './ProductPage.style'

interface ProductPageParams {
    id: string
}

const ProductPage: React.FC<RouteComponentProps<ProductPageParams>> = ({
    match,
    history,
}) => {
    const { id } = match.params

    const productService = useProductService()
    const favService = useFavoriteService()
    const cartService = useCartService()

    const { t } = useTranslation()

    const classes = useStyles()
    const theme = useTheme()

    const [product, setProduct] = React.useState<Product>()

    const [favorite, setFavorite] = React.useState<boolean>()
    const [amount, setAmount] = React.useState<number>(0)
    const [amounts, setAmounts] = React.useState<number[]>([])

    const [recommended, setRecommended] = React.useState<PreviewProduct[]>()

    const addToFav = async (e: any) => {
        e.stopPropagation()

        const r = await (favorite
            ? favService.remove(product!!.id)
            : favService.add(product!!.id))

        if (r.status !== HttpStatusCode.OK) return

        setFavorite(!favorite)
    }

    const addToCart = (e: any) => {
        e.stopPropagation()
        cartService.update({
            productId: product!!.id,
            amount,
            add: true,
        })
    }

    React.useEffect(() => {
        const handleNotFound = () => history.push('/404')

        const fetchProduct = async (productId: number) => {
            const r = await productService.getProduct(productId)

            switch (r.status) {
                case HttpStatusCode.OK:
                    setProduct(r.data)
                    break
                case HttpStatusCode.NotFound:
                    handleNotFound()
            }
        }

        let productId = parseInt(id)

        if (isNaN(productId)) handleNotFound()
        else fetchProduct(productId)
    }, [history, productService, id])

    React.useEffect(() => {
        const fetchRecommendations = async () => {
            // TODO
            const r = await productService.searchProducts({ query: 'P1' })

            if (r.status === HttpStatusCode.OK)
                setRecommended(r.data.items.slice(0, 8))
        }

        fetchRecommendations()
    }, [history, productService, id])

    const images = product?.images.sort((im) => im.i).map((im) => im.u)

    React.useEffect(() => {
        setFavorite(product?.fav === true)

        let amnts = Array.from(
            { length: Math.min(product?.stock!!, 20) },
            (_, i) => i + 1
        )

        if (amnts.length === 0) amnts = [0]

        setAmounts(amnts)
        setAmount(amnts[0])
    }, [product])

    return product !== undefined ? (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.image}>
                    <Paper className={classes.holder}>
                        <Img
                            className={classes.mainImage}
                            src={
                                images?.length
                                    ? images[0]
                                    : Constants.FALLBACK_IMAGE
                            }
                            alt={product.name}
                        />
                    </Paper>
                    <div className={classes.images}>
                        {images?.map((im, i) => (
                            <Paper key={i} className={classes.holder}>
                                <Img
                                    className={classes.imagePreview}
                                    src={im}
                                    alt={`I${i}`}
                                />
                            </Paper>
                        ))}
                    </div>
                </div>
                <div className={classes.details}>
                    <Typography variant="h5" component="h1">
                        {product.name}
                    </Typography>
                    <div>
                        <Typography variant="button">
                            {t(product.category.name!!)}
                        </Typography>
                        {' – '}
                        <Link
                            href={`/vendor/${product.userId}`}
                            onClick={(e: any) => e.preventDefault()}
                            variant="subtitle1"
                        >
                            {product.vendorNick}
                        </Link>
                    </div>
                    <div className={classes.priceRating}>
                        <Typography variant="h6">{product.price}</Typography>
                        <Rating
                            name="read-only"
                            value={product.rating}
                            readOnly
                        />
                    </div>
                    <div className={classes.descriptionBuy}>
                        <Typography
                            variant="body2"
                            className={classes.description}
                        >
                            {product.description}
                        </Typography>
                        <div>
                            {' '}
                            <div className={classes.buttons}>
                                {true && (
                                    <IconButton size="small">
                                        <EditOutlined />
                                    </IconButton>
                                )}
                                <IconButton size="small">
                                    <ReportOutlined />
                                </IconButton>
                                <IconButton size="small" onClick={addToFav}>
                                    {favorite ? (
                                        <Favorite
                                            htmlColor={theme.palette.error.main}
                                        />
                                    ) : (
                                        <FavoriteBorder />
                                    )}
                                </IconButton>
                            </div>
                            <Paper className={classes.buyHolder}>
                                <Autocomplete
                                    options={amounts}
                                    getOptionLabel={(i) => `${i}`}
                                    value={amount}
                                    disabled={amount === 0}
                                    onChange={(e, v) => setAmount(v)}
                                    style={{ width: 120 }}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('product.amount')}
                                            variant="outlined"
                                            margin="dense"
                                        />
                                    )}
                                />
                                <div>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        disabled={amount === 0}
                                        onClick={addToCart}
                                    >
                                        {t(
                                            amount === 0
                                                ? 'product.no_stock'
                                                : 'product.buy'
                                        )}
                                    </Button>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.bottom}>
                <Typography variant="h5" component="h2" color="textSecondary">
                    {t('info.interesting')}
                </Typography>
                {recommended && (
                    <ProductSlider
                        {...{
                            products: recommended,
                            productService,
                            favService,
                        }}
                    />
                )}
            </div>
        </div>
    ) : (
        <Loading />
    )
}

const Img: React.FC<any & { fallback?: string }> = ({
    fallback = Constants.FALLBACK_IMAGE,
    alt,
    ...rest
}) => {
    return (
        <picture>
            <source srcSet={fallback} />
            <img alt={alt} {...rest} />
        </picture>
    )
}

export default ProductPage
