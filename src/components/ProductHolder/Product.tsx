import React from 'react'

import { ActionType, PreviewProduct } from '../../types'

import { useStyles } from './Product.style'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import ShoppingBasket from '@material-ui/icons/ShoppingBasketOutlined'

import { useHistory } from 'react-router'
import { useTheme } from '@material-ui/core'
import { CartService, FavoriteService, ResourceService } from '../../api'
import { HttpStatusCode, Constants } from '../../utils'
import { useTranslation } from 'react-i18next'
import { useCollectorService } from '../../services'

interface ProductProps {
    Actions?: React.FC<ProductActionsProps>
}

interface ProductActionsProps {
    product: PreviewProduct
    favService?: FavoriteService
    cartService?: CartService
    resources?: ResourceService
    noFav?: boolean
    noCart?: boolean
}

const DefaultActions: React.FC<ProductActionsProps> = ({
    product,
    favService,
    cartService,
    noFav = false,
    noCart = false,
}) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [favorite, setFavorite] = React.useState(product.fav === true)

    const addToCart = (e: any) => {
        e.stopPropagation()
        cartService!!.update({
            productId: product.id,
            amount: 1,
            add: true,
        })
    }

    const addToFav = async (e: any) => {
        e.stopPropagation()

        const r = await (favorite
            ? favService!!.remove(product.id)
            : favService!!.add(product.id))

        if (r.status !== HttpStatusCode.OK) return

        setFavorite(!favorite)
    }

    return (
        <>
            {!noFav && (
                <IconButton
                    className={'holder-fav-bt'}
                    size={'small'}
                    onClick={addToFav}
                >
                    {favorite ? (
                        <Favorite htmlColor={theme.palette.error.main} />
                    ) : (
                        <FavoriteBorder />
                    )}
                </IconButton>
            )}
            {!noCart &&
                (product.stock ? (
                    <IconButton size={'small'} onClick={addToCart}>
                        <ShoppingBasket />
                    </IconButton>
                ) : (
                    <Typography
                        variant="body2"
                        color="error"
                        style={{ marginLeft: 4 }}
                    >
                        {t('product.no_stock')}
                    </Typography>
                ))}
        </>
    )
}

const ProductHolder: React.FC<ProductProps & ProductActionsProps> = ({
    product,
    Actions = DefaultActions,
    favService,
    cartService,
    resources,
    noFav = false,
    noCart = false,
}) => {
    const history = useHistory()

    const classes = useStyles()

    const collectorService = useCollectorService()

    const [img, setImg] = React.useState<any>()

    const gotoProduct = () => {
        collectorService.collect({
            item: product.id,
            action: ActionType.CLICK,
        })

        history.push(`/product/${product.id}`, undefined)
    }

    React.useEffect(() => {
        const loadImage = async () => {
            try {
                const r = await resources!!.load(product.mainImage)

                if (r.status !== HttpStatusCode.OK) return

                const reader = new FileReader()
                reader.readAsDataURL(r.data)
                reader.onload = () => setImg(reader.result)
            } catch (ex) {}
        }

        if (product.mainImage) loadImage()
    }, [product, resources])

    return (
        <Card className={classes.container}>
            <CardActionArea className="product" onClick={gotoProduct}>
                <CardMedia
                    className={classes.media}
                    image={img ?? Constants.FALLBACK_IMAGE}
                >
                    <Chip
                        style={{ backgroundColor: '#00000033' }}
                        label={product.name}
                        className={classes.titleChip}
                    />
                </CardMedia>
            </CardActionArea>
            <CardActions disableSpacing className={classes.actions}>
                <Actions
                    {...{ product, favService, cartService, noFav, noCart }}
                />

                <Typography className={classes.price}>
                    {`${product.price}€`}
                </Typography>
            </CardActions>
        </Card>
    )
}

export default ProductHolder
