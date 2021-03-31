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

    const [removed, setRemoved] = React.useState(false)
    const [unavailable, setUnavailable] = React.useState(false)

    const [amountField, setAmountField] = React.useState<any>(pc.amount)
    const [amountError, setAmountError] = React.useState<string>()

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
                setUnavailable(true)
        }
    }

    const changeUnits = async () => {
        if (removed) return
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

        await cartService.update({
            productId: pc.product.id,
            amount: a,
            add: false,
        })
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
                        component="h2"
                        onClick={gotoProduct}
                    >
                        {pc.product.name}
                    </Typography>
                </div>
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
                        disabled={removed}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {amountError && (
                        <Typography
                            variant="caption"
                            color="error"
                            className={classes.subtotal}
                        >
                            {amountError}
                        </Typography>
                    )}
                </div>
                <div className={classes.actions}>
                    {unavailable ? (
                        <Typography variant="button" color="error">
                            {t('cart.unavailable')}
                        </Typography>
                    ) : (
                        <IconButton size={'small'} onClick={handleCart}>
                            {removed ? (
                                <UndoIcon />
                            ) : (
                                <DeleteIcon
                                    htmlColor={theme.palette.error.main}
                                />
                            )}
                        </IconButton>
                    )}
                </div>
            </div>
        </Paper>
    )
}

export default CartProductHolder
