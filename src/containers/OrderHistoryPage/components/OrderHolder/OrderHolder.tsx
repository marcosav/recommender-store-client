import React from 'react'

import { useTranslation } from 'react-i18next'

import { useStyles } from './OrderHolder.style'
import { Order, OrderedProduct } from '../../../../types'
import { ProductImg } from '../../../../components'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Rating from '@material-ui/lab/Rating'
import ButtonBase from '@material-ui/core/ButtonBase'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { DateUtils } from '../../../../utils'
import { ResourceService } from '../../../../api'
import { useProductService } from '../../../../services'

interface OrderHolderProps {
    order: Order
    resources: ResourceService
    history: any
}

const OrderHolder: React.FC<OrderHolderProps> = ({
    order: o,
    resources,
    history,
}) => {
    const classes = useStyles()

    const { t } = useTranslation()

    const [expanded, setExpanded] = React.useState(false)

    const handleChange = (e: any, isExpanded: boolean) =>
        setExpanded(isExpanded)

    const gotoProduct = (id: number) => () =>
        history.push(`/product/${id}`, undefined)

    const round = (n: number) => Math.round(n * 100) / 100

    const total = round(
        o.items.reduce<number>((v, p) => (v += p.amount * p.unitPrice), 0)
    )

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <Typography variant="body2" className={classes.id}>
                    #{o.id}
                </Typography>
                <Typography className={classes.heading}>
                    {DateUtils.format(o.date.seconds)}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                    {o.items.length}{' '}
                    {t(o.items.length > 1 ? 'cart.items' : 'cart.item')}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                    {total} {'€'}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List className={classes.container}>
                    <Typography variant="h6" color="textSecondary">
                        {t('address.address')}
                    </Typography>
                    <div className={classes.address}>
                        {Object.entries(o.address).map(([k, v], i) =>
                            i ? (
                                <div key={i} className={classes.addressValues}>
                                    <Typography
                                        component="span"
                                        color="textSecondary"
                                    >
                                        {t(`address.${k}`)}:
                                    </Typography>
                                    <Typography>{v}</Typography>
                                </div>
                            ) : (
                                <div key={i}></div>
                            )
                        )}
                    </div>
                    {o.items.map((p, i) => (
                        <OrderedProductHolder
                            key={i}
                            {...{ resources, product: p, gotoProduct }}
                        />
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

interface OrderedProductHolderProps {
    product: OrderedProduct
    resources: ResourceService
    gotoProduct: any
}

const OrderedProductHolder: React.FC<OrderedProductHolderProps> = ({
    product: p,
    resources,
    gotoProduct,
}) => {
    const productService = useProductService()

    const classes = useStyles()

    const [rating, setRating] = React.useState<number | null>(
        p.userRating ?? null
    )

    const id = p.product.id

    const handleRating = (e: any, v: number | null) => {
        if (v == null) return
        setRating(v)
        productService.rateProduct(id, v)
    }

    return (
        <div>
            <Divider />
            <ListItem className={classes.product}>
                <div className={classes.imageContainer}>
                    <Paper className={classes.image}>
                        <ButtonBase onClick={gotoProduct(p.product.id)}>
                            <ProductImg
                                url={p.product.mainImage}
                                resources={resources}
                            />
                        </ButtonBase>
                    </Paper>
                </div>
                <div className={classes.data}>
                    <div className={classes.title}>
                        <Typography
                            variant="body2"
                            component="span"
                            color="textSecondary"
                        >
                            {'x'}
                            {p.amount}
                        </Typography>
                        <Typography onClick={gotoProduct(p.product.id)}>
                            {p.product.name}
                        </Typography>
                    </div>
                    <Rating
                        name={`product-rating-${id}`}
                        precision={0.5}
                        value={rating}
                        onChange={handleRating}
                    />
                    <Typography className={classes.price}>
                        {p.amount * p.unitPrice} {'€'}
                    </Typography>
                </div>
            </ListItem>
        </div>
    )
}

export default OrderHolder
