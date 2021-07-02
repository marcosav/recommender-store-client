import React from 'react'

import { RouteComponentProps } from 'react-router'

import {
    useCartService,
    useFeedbackService,
    useFavoriteService,
    useProductService,
} from '../../services'

import { ActionType, PreviewProduct, Product } from '../../types'
import { HttpStatusCode } from '../../utils'

import { Loading, ProductSlider } from '../../components'

import { useTranslation } from 'react-i18next'

import Typography from '@material-ui/core/Typography'

import { useStyles } from './ProductPage.style'
import ProductInfo from './components'
import useRecommenderService from '../../services/RecommenderService'

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
    const feedbackService = useFeedbackService()
    const recommenderService = useRecommenderService()

    const { t } = useTranslation()

    const classes = useStyles()

    const [product, setProduct] = React.useState<Product>()

    const [recommended, setRecommended] = React.useState<
        PreviewProduct[] | null
    >()

    React.useEffect(() => {
        if (product) document.title = product.name
    }, [product])

    React.useEffect(() => {
        const handleNotFound = () => {
            history.replace('/404')
        }

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
        else {
            fetchProduct(productId)
            feedbackService.collect({
                action: ActionType.VISIT,
                item: productId,
            })
        }
    }, [history, productService, feedbackService, id])

    React.useEffect(() => {
        const fetchRecommendations = async (p: number) => {
            const r = await recommenderService.getFor(p)

            if (r.status === HttpStatusCode.OK) setRecommended(r.data)
            else setRecommended(null)
        }

        let productId = parseInt(id)
        if (productId) fetchRecommendations(productId)
    }, [history, recommenderService, id])

    return product !== undefined ? (
        <div className={classes.root}>
            <ProductInfo {...{ product }} />
            <div className={classes.bottom}>
                <Typography
                    variant="h5"
                    component="h2"
                    color="textSecondary"
                    className={classes.subtitle}
                >
                    {t('info.interesting')}
                </Typography>

                {recommended ? (
                    <ProductSlider
                        {...{
                            products: recommended,
                            productService,
                            cartService,
                            favService,
                        }}
                    />
                ) : recommended === undefined ? (
                    <Loading />
                ) : (
                    <></>
                )}
            </div>
        </div>
    ) : (
        <Loading />
    )
}

export default ProductPage
