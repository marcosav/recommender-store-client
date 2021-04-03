import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import PaymentIcon from '@material-ui/icons/Payment'

import {
    useCartService,
    useSessionService,
    useUserService,
} from '../../services'

import { useStyles } from './CheckoutPage.style'

import { Redirect, RouteComponentProps } from 'react-router'
import { useTranslation } from 'react-i18next'

import { HttpStatusCode, ValidationTools } from '../../utils'
import { UserAddress } from '../../types'
import { InvalidCartDialog } from '../CartPage/components'

const CheckoutPage: React.FC<RouteComponentProps> = ({ history, location }) => {
    const cartService = useCartService()
    const userService = useUserService()
    const sessionService = useSessionService()

    const { t } = useTranslation()

    const classes = useStyles()

    const state = location.state as any

    const [addresses, setAddresses] = React.useState<UserAddress[]>()

    const [errors, setErrors] = React.useState({})
    const [data, setData] = React.useState<UserAddress>({
        recipient: '',
        code: '',
        city: '',
        region: '',
        country: '',
        address: '',
        phone: '',
    })

    const [content, setContent] = React.useState<string>()

    React.useEffect(() => {
        ;(async () => {
            const r = await userService.addresses(
                sessionService.current()?.userId!!
            )

            if (r.status !== HttpStatusCode.OK) return
            setAddresses(r.data)
        })()
    }, [sessionService, userService])

    if (!state) return <Redirect to={'/cart'} />
    const { total, size } = state

    const selectAddress = (i: number) => () => {
        if (addresses) setData(addresses[i])
    }

    const checkout = async (e: any) => {
        e.preventDefault()

        const r = await cartService.checkout(data)
        switch (r.status) {
            case HttpStatusCode.BadRequest:
                const err = (r.data as any).error
                if (err === 'invalid') setContent(t('checkout.invalid'))
                else if (err === 'empty') setContent(t('checkout.empty'))
                else setErrors(err)
                return
            case HttpStatusCode.OK:
                break
            default:
                return
        }

        history.push('/history', { done: r.data.orderId })
        setErrors({})
    }

    const updateData = (actual: {}) => {
        setData({ ...data, ...actual })
    }

    const changeData = (field: string) => (e: any) =>
        updateData({ [field]: e.target.value })

    const { errorFor, helperFor } = ValidationTools.createValidator(t, errors)

    return (
        <>
            <header className={classes.header}>
                <Typography
                    className={classes.title}
                    variant="h3"
                    component="h1"
                >
                    {t('checkout.title')}
                </Typography>
            </header>

            <Typography
                variant="h6"
                component="h2"
                color="textSecondary"
                className={classes.addressesTitle}
            >
                {t(
                    addresses !== undefined
                        ? addresses?.length
                            ? 'checkout.recent_addresses'
                            : 'checkout.no_recent_addresses'
                        : 'checkout.loading_recent_addresses'
                )}
            </Typography>

            {addresses && addresses.length > 0 && (
                <div className={classes.addressContainer}>
                    {addresses.map((a, i) => (
                        <ButtonBase className={classes.addressButton}>
                            <Paper
                                key={i}
                                variant="outlined"
                                className={classes.addressHolder}
                                onClick={selectAddress(i)}
                            >
                                <Typography variant="body2">
                                    {a.recipient}
                                    {' / '}
                                    {a.address}
                                    {' / '}
                                    {a.city}
                                    {' / '}
                                    {a.region}
                                    {' / '}
                                    {a.country}
                                </Typography>
                            </Paper>
                        </ButtonBase>
                    ))}
                    <div className={classes.endGap} />
                </div>
            )}

            <form
                className={classes.root}
                onSubmitCapture={checkout}
                noValidate
                autoComplete="off"
            >
                <div className={classes.form}>
                    <Typography
                        variant="h6"
                        component="h2"
                        color="textSecondary"
                    >
                        {t('address.address')}
                    </Typography>
                    <TextField
                        className={classes.input}
                        label={t('address.recipient')}
                        variant="outlined"
                        value={data['recipient']}
                        onChange={changeData('recipient')}
                        error={errorFor('recipient')}
                        helperText={helperFor('recipient')}
                        required
                    />
                    <div className={classes.pair}>
                        <TextField
                            className={classes.input}
                            label={t('address.city')}
                            variant="outlined"
                            value={data['city']}
                            onChange={changeData('city')}
                            error={errorFor('city')}
                            helperText={helperFor('city')}
                            required
                        />
                        <TextField
                            className={classes.input}
                            label={t('address.region')}
                            variant="outlined"
                            value={data['region']}
                            onChange={changeData('region')}
                            error={errorFor('region')}
                            helperText={helperFor('region')}
                            required
                        />
                    </div>
                    <div className={classes.pair}>
                        <TextField
                            className={classes.input}
                            label={t('address.code')}
                            variant="outlined"
                            value={data['code']}
                            onChange={changeData('code')}
                            error={errorFor('code')}
                            helperText={helperFor('code')}
                            required
                        />
                        <TextField
                            className={classes.input}
                            label={t('address.country')}
                            variant="outlined"
                            value={data['country']}
                            onChange={changeData('country')}
                            error={errorFor('country')}
                            helperText={helperFor('country')}
                            required
                        />
                    </div>
                    <TextField
                        className={classes.input}
                        label={t('address.address')}
                        variant="outlined"
                        value={data['address']}
                        onChange={changeData('address')}
                        error={errorFor('address')}
                        helperText={helperFor('address')}
                        required
                    />
                    <TextField
                        className={classes.input}
                        label={t('address.phone')}
                        variant="outlined"
                        value={data['phone']}
                        onChange={changeData('phone')}
                        error={errorFor('phone')}
                        helperText={helperFor('phone')}
                        required
                    />
                </div>
                <Paper variant="outlined" className={classes.summary}>
                    <Typography variant="h6" component="p">
                        {t('cart.total')}
                        {`: ${total} €`}
                    </Typography>

                    <Typography
                        variant="body1"
                        component="p"
                        color="textSecondary"
                    >
                        {size} {t(size > 1 ? 'cart.items' : 'cart.item')}
                    </Typography>

                    <Button
                        onClick={undefined}
                        color="secondary"
                        variant="contained"
                        size="large"
                        type="submit"
                        endIcon={<PaymentIcon />}
                    >
                        {t('checkout.finish')}
                    </Button>
                </Paper>
            </form>

            <InvalidCartDialog {...{ content, setContent }} />
        </>
    )
}

export default CheckoutPage
