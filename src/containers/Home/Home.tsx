import React from 'react'

import { Loading, ProductSlider } from '../../components'

import {
    useCartService,
    useFavoriteService,
    useProductService,
} from '../../services'
import { PreviewProduct, ProductCategory } from '../../types'

import { HttpStatusCode } from '../../utils'

import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'

import { useTranslation } from 'react-i18next'
import { useStyles } from './Home.style'

import { RouteComponentProps } from 'react-router'
import useRecommenderService from '../../services/RecommenderService'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const productService = useProductService()
    const favService = useFavoriteService()
    const cartService = useCartService()
    const recommenderService = useRecommenderService()

    const { t } = useTranslation()

    const classes = useStyles()

    const [categories, setCategories] = React.useState<ProductCategory[]>()

    const [popular, setPopular] = React.useState<PreviewProduct[] | null>()
    const [recommended, setRecommended] = React.useState<
        PreviewProduct[] | null
    >()

    React.useEffect(() => {
        const fetchRecommended = async () => {
            const r = await recommenderService.getFor()
            if (r.status === HttpStatusCode.OK) setRecommended(r.data)
            else setRecommended(null)
        }

        const fetchPopular = async () => {
            const r = await recommenderService.getPopular()
            if (r.status === HttpStatusCode.OK) setPopular(r.data)
            else setPopular(null)
        }

        fetchRecommended()
        fetchPopular()
    }, [recommenderService])

    React.useEffect(() => {
        const fetchCategories = async () => {
            const r = await productService.findCategories()

            if (r.status === HttpStatusCode.OK) setCategories(r.data)
        }

        if (!categories) fetchCategories()
    }, [productService, categories])

    const handleCategory = (id: number) =>
        history.push('/search/all', { all: true, category: id })

    return (
        <>
            <Typography
                className={classes.title}
                variant="h2"
                component="h1"
                color="textSecondary"
            >
                {t('home.title')}
            </Typography>
            <div className={classes.categories}>
                {categories &&
                    categories.map((c) => (
                        <Chip
                            key={c.id}
                            color="secondary"
                            onClick={() => handleCategory(c.id)}
                            label={t(`category.${c.name}`)}
                        />
                    ))}
            </div>
            <Divider className={classes.divider} />

            <div className={classes.slider}>
                {popular ? (
                    <>
                        <Typography
                            className={classes.subtitle}
                            variant="h5"
                            component="h2"
                            color="textSecondary"
                        >
                            {t('home.weekly_popular')}
                        </Typography>
                        <ProductSlider
                            {...{
                                products: popular,
                                productService,
                                cartService,
                                favService,
                            }}
                        />
                    </>
                ) : popular === undefined ? (
                    <Loading />
                ) : (
                    <></>
                )}
            </div>

            <div className={classes.slider}>
                {recommended ? (
                    <>
                        <Typography
                            className={classes.subtitle}
                            variant="h5"
                            component="h2"
                            color="textSecondary"
                        >
                            {t('home.recommended')}
                        </Typography>
                        <ProductSlider
                            {...{
                                products: recommended,
                                productService,
                                cartService,
                                favService,
                            }}
                        />
                    </>
                ) : recommended === undefined ? (
                    <Loading />
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}

export default Home
