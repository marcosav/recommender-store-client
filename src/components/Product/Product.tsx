import React from 'react'

import { PreviewProduct } from '../../types'

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
import { CartService, FavoriteService } from '../../api'
import { HttpStatusCode, Constants } from '../../utils'

interface ProductProps {
    Actions?: React.FC<ProductActionsProps>
}

interface ProductActionsProps {
    product: PreviewProduct
    favService?: FavoriteService
    cartService?: CartService
}

const DefaultActions: React.FC<ProductActionsProps> = ({
    product,
    favService,
    cartService,
}) => {
    const theme = useTheme()

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
            <IconButton size={'small'} onClick={addToFav}>
                {favorite ? (
                    <Favorite htmlColor={theme.palette.error.main} />
                ) : (
                    <FavoriteBorder />
                )}
            </IconButton>
            <IconButton size={'small'} onClick={addToCart}>
                <ShoppingBasket />
            </IconButton>
        </>
    )
}

const ProductHolder: React.FC<ProductProps & ProductActionsProps> = ({
    product,
    Actions = DefaultActions,
    favService,
    cartService,
}) => {
    const history = useHistory()

    const classes = useStyles()

    const gotoProduct = () => history.push(`/product/${product.id}`, undefined)

    return (
        <Card className={classes.container}>
            <CardActionArea onClick={gotoProduct}>
                <CardMedia
                    className={classes.media}
                    image={product.mainImage ?? Constants.FALLBACK_IMAGE}
                >
                    <Chip label={product.name} className={classes.titleChip} />
                </CardMedia>
            </CardActionArea>
            <CardActions disableSpacing className={classes.actions}>
                <Actions {...{ product, favService, cartService }} />

                <Typography className={classes.price}>
                    {`${product.price}€`}
                </Typography>
            </CardActions>
        </Card>
    )
}

export default ProductHolder
