import React from 'react'

import { useHistory } from 'react-router'

import useTheme from '@material-ui/core/styles/useTheme'

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
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined'
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined'

import { useStyles } from './ProductInfo.style'

import { Product } from '../../../../types'
import {
    useCartService,
    useFavoriteService,
    useResourceService,
    useSessionService,
} from '../../../../services'
import { Constants, HttpStatusCode } from '../../../../utils'
import { ProductImg, ReportDialog } from '../../../../components'

interface ProductInfoParams {
    product: Product
}

const ProductInfo: React.FC<ProductInfoParams> = ({ product }) => {
    const history = useHistory()

    const favService = useFavoriteService()
    const cartService = useCartService()
    const resources = useResourceService()
    const sessionService = useSessionService()

    const { t } = useTranslation()

    const classes = useStyles()
    const theme = useTheme()

    const [favorite, setFavorite] = React.useState<boolean>()
    const [amount, setAmount] = React.useState<number>(0)
    const [amounts, setAmounts] = React.useState<number[]>([])
    const [selectedImgUrl, setSelectedImgUrl] = React.useState<string>()
    const [selectedImg, setSelectedImg] = React.useState<any>()

    const [reporting, setReporting] = React.useState(false)

    const session = sessionService.current()
    const logged = sessionService.isLogged()
    const owner = session?.userId === product.userId
    const admin = session?.admin
    const editable = owner || admin

    const addToFav = async (e: any) => {
        e.stopPropagation()

        const r = await (favorite
            ? favService.remove(product.id)
            : favService.add(product.id))

        if (r.status !== HttpStatusCode.OK) return

        setFavorite(!favorite)
    }

    const addToCart = (e: any) => {
        e.stopPropagation()
        cartService.update({
            productId: product.id,
            amount,
            add: true,
        })
    }

    const edit = () => {
        if (editable) history.push(`/product/${product.id}/edit`)
    }

    const reports = () => {
        if (admin) history.push(`/reports/${product.id}`)
    }

    const report = () => setReporting(true)

    const checkVendor = (e: any) => {
        e.preventDefault()
        history.push(`/vendor/${product.userId}`)
    }

    React.useEffect(() => {
        setFavorite(product.fav === true)

        let amnts = Array.from(
            { length: Math.min(product.stock!!, 20) },
            (_, i) => i + 1
        )

        if (amnts.length === 0) amnts = [0]

        setAmounts(amnts)
        setAmount(amnts[0])

        if (product.images.length > 0) setSelectedImgUrl(product.images[0].u)
        else {
            setSelectedImgUrl(undefined)
            setSelectedImg(undefined)
        }
    }, [product])

    return (
        <>
            <div className={classes.root}>
                <div className={classes.image}>
                    <Paper className={classes.holder}>
                        <ProductImg
                            className={classes.mainImage}
                            src={selectedImg ?? Constants.FALLBACK_IMAGE}
                            alt={product.name}
                        />
                    </Paper>
                    <div className={classes.images}>
                        {product.images.map((im) => (
                            <Paper
                                key={im.i}
                                className={classes.holder}
                                onClick={() => setSelectedImgUrl(im.u)}
                            >
                                <ProductImg
                                    className={classes.imagePreview}
                                    url={im.u}
                                    resources={resources}
                                    selectedImgUrl={selectedImgUrl}
                                    setSelectedImg={setSelectedImg}
                                    alt={`I${im.i}`}
                                />
                            </Paper>
                        ))}
                    </div>
                </div>
                <div className={classes.details}>
                    <Typography variant="h5" component="h1">
                        {product.name}
                    </Typography>
                    <div className={classes.catVendorVisits}>
                        <div>
                            <Typography variant="button">
                                {t(`category.${product.category.name}`)}
                            </Typography>
                            {' – '}
                            <Link
                                href={`/vendor/${product.userId}`}
                                onClick={checkVendor}
                                variant="subtitle1"
                            >
                                {product.vendorNick}
                            </Link>
                        </div>
                        <div className={classes.visits}>
                            <VisibilityIcon color="disabled" />
                            <Typography variant="button" color="textSecondary">
                                {product.visits}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.priceRating}>
                        <Typography variant="h6">
                            {product.price} {'€'}
                        </Typography>
                        <Rating
                            value={product.rating}
                            precision={0.1}
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
                                {admin && (
                                    <IconButton size="small" onClick={reports}>
                                        <AssessmentIcon />
                                    </IconButton>
                                )}
                                {editable && (
                                    <IconButton size="small" onClick={edit}>
                                        <EditOutlined />
                                    </IconButton>
                                )}
                                {logged && (
                                    <IconButton size="small" onClick={report}>
                                        <ReportOutlined />
                                    </IconButton>
                                )}
                                {!owner && (
                                    <IconButton size="small" onClick={addToFav}>
                                        {favorite ? (
                                            <Favorite
                                                htmlColor={
                                                    theme.palette.error.main
                                                }
                                            />
                                        ) : (
                                            <FavoriteBorder />
                                        )}
                                    </IconButton>
                                )}
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
            <ReportDialog
                {...{ product, open: reporting, setOpen: setReporting }}
            />
        </>
    )
}

export default ProductInfo
