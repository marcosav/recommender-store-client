import React from 'react'

import { CartProductPreview } from '../../../../types'
import { CartService, FavoriteService, ResourceService } from '../../../../api'

import { useTheme } from '@material-ui/core'

import { HttpStatusCode } from '../../../../utils'

import ButtonBase from '@material-ui/core/ButtonBase'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import UndoIcon from '@material-ui/icons/Undo'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'

import { useStyles } from './CartProductHolder.style'

import { useTranslation } from 'react-i18next'
import { ProductImg } from '../../../../components'

const round = (n: number) => Math.round(n * 100) / 100

const CartProductHolder: React.FC<{
    product: CartProductPreview
    cartService: CartService
    favoriteService: FavoriteService
    resources: ResourceService
    history: any
    updateTotal: any
}> = ({
    product: pc,
    cartService,
    favoriteService,
    history,
    resources,
    updateTotal,
}) => {
    const theme = useTheme()
    const classes = useStyles()
    const { t } = useTranslation()

    const [favorite, setFavorite] = React.useState(pc.product.fav === true)

    const [removed, setRemoved] = React.useState(false)
    const [unavailable, setUnavailable] = React.useState(
        pc.unavailable === true
    )

    const [amountField, setAmountField] = React.useState<any>(pc.amount)
    const [amountError, setAmountError] = React.useState<string>()

    const outStock = pc.product.stock <= 0

    const calcSub = () => round(pc.amount * pc.product.price)

    const [subtotal, setSubtotal] = React.useState(calcSub())

    const checkStock = (a: number) => {
        if (a > pc.product.stock) {
            setAmountError(t('cart.no_stock'))
            return true
        }
        return false
    }

    React.useEffect(() => {
        checkStock(pc.amount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setAmountError, pc])

    const gotoProduct = () =>
        history.push(`/product/${pc.product.id}`, undefined)

    const handleCart = async (e: any) => {
        e.stopPropagation()

        const r = await (!removed
            ? cartService.remove(pc.product.id)
            : cartService.update({
                  productId: pc.product.id,
                  amount: pc.amount,
                  add: false,
              }))

        switch (r.status) {
            case HttpStatusCode.OK:
                pc.removed = !removed
                updateTotal()
                setRemoved(!removed)
                break
            case HttpStatusCode.NotFound:
                pc.unavailable = true
                setUnavailable(true)
                break
            case HttpStatusCode.BadRequest:
                if (pc.product.stock) checkStock(pc.amount)
        }
    }

    const changeUnits = async () => {
        const a = parseInt(amountField)

        setAmountField(pc.amount)
        if (isNaN(a)) return

        if (a <= 0 || a === pc.amount) return

        setAmountField(a)
        if (checkStock(a)) return

        pc.amount = a
        updateTotal()
        setAmountError(undefined)
        setSubtotal(calcSub())

        const r = await cartService.update({
            productId: pc.product.id,
            amount: a,
            add: false,
        })

        if (r.status !== HttpStatusCode.OK) return

        setRemoved(false)
        updateTotal()
    }

    const addToFav = async (e: any) => {
        e.stopPropagation()

        const r = await (favorite
            ? favoriteService.remove(pc.product.id)
            : favoriteService.add(pc.product.id))

        if (r.status !== HttpStatusCode.OK) return

        setFavorite(!favorite)
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.imageContainer}>
                <Paper className={classes.image}>
                    <ButtonBase onClick={gotoProduct}>
                        <ProductImg
                            url={pc.product.mainImage}
                            resources={resources}
                        />
                    </ButtonBase>
                </Paper>
            </div>

            <div className={classes.content}>
                <div className={classes.title}>
                    <Typography
                        variant="h6"
                        component={unavailable ? 'h3' : 'h2'}
                        onClick={unavailable ? undefined : gotoProduct}
                        color={unavailable ? 'error' : 'initial'}
                    >
                        {unavailable ? t('cart.unavailable') : pc.product.name}
                    </Typography>

                    {unavailable && (
                        <Typography
                            variant="body1"
                            component="p"
                            color={'textSecondary'}
                        >
                            {pc.product.name}
                        </Typography>
                    )}
                </div>

                {!unavailable && (
                    <>
                        <Typography variant="button" color="textSecondary">
                            {`${pc.product.price} €/`}
                            {t('cart.unit')}
                        </Typography>
                        <Typography
                            variant="h6"
                            className={classes.subtotal}
                        >{`${subtotal} €`}</Typography>

                        <div className={classes.amount}>
                            <TextField
                                label={t('product.amount')}
                                variant="outlined"
                                margin="dense"
                                value={amountField}
                                style={{ maxWidth: 100 }}
                                onChange={(e) => setAmountField(e.target.value)}
                                onBlur={changeUnits}
                                error={amountError !== undefined}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {!outStock && amountError && (
                                <Typography
                                    variant="caption"
                                    color="error"
                                    className={classes.subtotal}
                                >
                                    {amountError}
                                </Typography>
                            )}
                            {outStock && (
                                <Typography
                                    className={classes.subtotal}
                                    variant="button"
                                    color="error"
                                >
                                    {t('product.no_stock')}
                                </Typography>
                            )}
                        </div>
                    </>
                )}

                <div className={classes.actions}>
                    <IconButton
                        id="remove-cart-bt"
                        size={'small'}
                        onClick={handleCart}
                    >
                        {removed ? (
                            !unavailable && <UndoIcon />
                        ) : (
                            <DeleteIcon htmlColor={theme.palette.error.main} />
                        )}
                    </IconButton>
                    {!unavailable && (
                        <IconButton size={'small'} onClick={addToFav}>
                            {favorite ? (
                                <Favorite
                                    htmlColor={theme.palette.error.main}
                                />
                            ) : (
                                <FavoriteBorder />
                            )}
                        </IconButton>
                    )}
                </div>
            </div>
        </Paper>
    )
}

export default CartProductHolder
